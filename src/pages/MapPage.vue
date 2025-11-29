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
            if (this.showProvince && mapObjects["province"]) {
                objectArray = objectArray.concat(mapObjects["province"]);
            }
            if (this.showCapital && mapObjects["capital"]) {
                objectArray = objectArray.concat(mapObjects["capital"]);
            }
            if (this.showTown && mapObjects["town"]) {
                objectArray = objectArray.concat(mapObjects["town"]);
            }

            return objectArray;
        },

        // Параметры отображения
        showProvince() { return this.$store.getters.SHOW_PROVINCE },
        showCapital() { return this.$store.getters.SHOW_CAPITAL },
        showTown() { return this.$store.getters.SHOW_TOWN }
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