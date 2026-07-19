<script>
import MapCanvas from '@/components/default/MapCanvas.vue';
import SDTObjectInfo from '@/components/object-info/SDTObjectInfo.vue';
import PointCanvas from '@/components/default/PointCanvas.vue';
import UIPanel from '@/components/default/UIPanel.vue';

export default {
    components: {
        MapCanvas,
        PointCanvas,
        SDTObjectInfo,
        UIPanel
    },
    computed: {
        mapObjects() {
            const projectName = this.$route.params.project;
            const mapName = this.$route.params.map

            const mapObject = this.$store.getters.MAP_OBJECT(projectName);

            // Получение данных для отображения по фильтрам
            let objectArray = [];
            Object.values(mapObject).forEach((data) => {
                // Проверка, что точку надо отображать на этой карте
                if (data.target == null) return;
                if (!data.target.includes(mapName)) return;

                // Проверка на фильтрацию
                if (data.type == null) return;
                const filter = this.$store.getters.FILTER_VALUE(projectName, data.type);
                if (!filter) return;

                // Добавление, если все проверки пройдены
                if (filter.state) objectArray = objectArray.concat(data);
            });

            return objectArray;
        },
    },
    async mounted() {
        const projectName = this.$route.params.project;

        // Получение параметров всех миров
        await this.$store.dispatch("LOAD_WORLD");
        // Получение данных мира
        await this.$store.dispatch("LOAD_CHARACTER", projectName);
        await this.$store.dispatch("LOAD_MAP_OBJECT", projectName);
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