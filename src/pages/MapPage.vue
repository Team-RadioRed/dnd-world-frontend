<script>
import MapCanvas from '@/components/default/MapCanvas.vue';
import SDTObjectInfo from '@/components/object-info/SDTObjectInfo.vue';
import PointCanvas from '@/components/default/PointCanvas.vue';
import UIPanel from '@/components/ui/UIPanel.vue';

export default {
    components: {
        MapCanvas,
        PointCanvas,
        SDTObjectInfo,
        UIPanel
    },
    computed: {
        mapObjects() {
            const mapName = this.$route.params.map;

            const mapObjects = this.$store.getters.MAP_OBJECT(this.$route.params.project);
            const mapConfig = this.$store.getters.WORLD_CONFIG;

            if (!mapConfig || !mapObjects) return [];

            // Получение данных для отображения по фильтрам
            let objectArray = [];
            Object.values(mapObjects).forEach((data) => {
                // Проверка, что точку надо отображать на этой карте
                if (data.target == null) return;
                if (!data.target.includes(mapName)) return;

                // Проверка на фильтрацию
                if (data.type == null) return;
                if (mapConfig.filter[data.type] == null) return;

                // Добавление, если все проверки пройдены
                if (mapConfig.filter[data.type].state) objectArray.push(data);
            });
            
            return objectArray;
        }
    },
    async mounted() {
        const projectName = this.$route.params.project;
        const mapName = this.$route.params.map;

        // Получение параметров всех миров
        await this.$store.dispatch("LOAD_WORLD");
        await this.$store.dispatch("LOAD_WORLD_DATA", { 
            project: projectName, 
            name: mapName
        });
        // Получение данных мира
        await this.$store.dispatch("LOAD_CHARACTER", projectName);
        await this.$store.dispatch("LOAD_MAP_OBJECT", projectName);
    },
    watch: {
        '$route.params.map'(newName) {
            void this.$store.dispatch("LOAD_WORLD_DATA", { 
                project: this.$route.params.project, 
                name: newName 
            });
            this.$store.dispatch("CLOSE_ALL");
        }
    }
}
</script>


<template>
    <!-- UI -->
    <SDTObjectInfo />
    <UIPanel />
    <!-- Map -->
    <MapCanvas>
        <PointCanvas :mapObjects="mapObjects" />
    </MapCanvas>
</template>