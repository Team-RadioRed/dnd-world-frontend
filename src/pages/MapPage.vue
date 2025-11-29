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
        // Точки интереса на карте
        mapObjects() {
            const mapObjects = this.$store.getters.MAP_OBJECTS(this.$route.params.project);

            // Проверка что данные есть
            if (!mapObjects) return [];
            if (Object.keys(mapObjects).length === 0) return [];

            // Получение данных для отображения по фильтрам
            let objectArray = [];
            Object.keys(mapObjects).forEach((name) => {
                const filter = this.$store.getters.FILTER_VALUE(this.$route.params.project, name);

                if (filter) {
                    if (filter.state) {
                        objectArray = objectArray.concat(mapObjects[name]);
                    }
                }
                else {
                    objectArray = objectArray.concat(mapObjects[name]);
                }
            });

            return objectArray;
        },
    },
    async mounted() {
        // Получение параметров всех миров
        await this.$store.dispatch("LOAD_WORLDS");
        // Получение данных мира
        await this.$store.dispatch("LOAD_CHARACTERS", this.$route.params.project);
        await this.$store.dispatch("LOAD_MAP_OBJECTS", this.$route.params.project);
        await this.$store.dispatch("LOAD_ADDITIONAL_PAGE", this.$route.params.project);
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