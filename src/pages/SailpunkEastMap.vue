<script>
import MapCanvas from '@/components/MapCanvas.vue';
import ObjectInfo from '@/components/object-info/ObjectInfo.vue';
import PointCanvas from '@/components/PointCanvas.vue';
import AdditionalMapButton from '@/components/sailpunk/AdditionalMapButton.vue';
import MapFilter from '@/components/sailpunk/MapFilter.vue';

export default {
    components: {
        MapCanvas,
        PointCanvas,
        ObjectInfo,
        AdditionalMapButton,
        MapFilter
    },
    computed: {
        mapData() { return this.$store.getters.MAP_DATA },
        mapObjects() {
            const mapObjects = this.$store.getters.MAP_OBJECTS;
            if (Object.keys(mapObjects).length === 0) return [];

            let objectArray = [];
            if (this.showProvince) {
                objectArray = objectArray.concat(mapObjects["province"]);
            }
            if (this.showCapital) {
                objectArray = objectArray.concat(mapObjects["capital"]);
            }
            if (this.showTown) {
                objectArray = objectArray.concat(mapObjects["town"]);
            }

            return objectArray;
        },
        showProvince() { return this.$store.getters.SHOW_PROVINCE },
        showCapital() { return this.$store.getters.SHOW_CAPITAL },
        showTown() { return this.$store.getters.SHOW_TOWN }
    },
    async mounted() {
        await this.$store.dispatch("LOAD_CHARACTERS");
        await this.$store.dispatch("LOAD_MAP_OBJECTS");
        await this.$store.dispatch("LOAD_ADDITIONAL_PAGE");
    }
}
</script>


<template>
    <AdditionalMapButton />
    <MapFilter />
    <ObjectInfo />

    <MapCanvas :mapData="mapData">
        <PointCanvas :mapObjects="mapObjects" />
    </MapCanvas>
</template>