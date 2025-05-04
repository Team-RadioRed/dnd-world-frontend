<script>
import MapCanvas from '@/components/MapCanvas.vue';
import ObjectInfo from '@/components/object-info/ObjectInfo.vue';
import PointCanvas from '@/components/PointCanvas.vue';
import AdditionalMapButton from '@/components/sailpunk/AdditionalMapButton.vue';

export default {
    components: {
        MapCanvas,
        PointCanvas,
        ObjectInfo,
        AdditionalMapButton
    },
    computed: {
        mapData() { return this.$store.getters.MAP_DATA },
        mapObjects() { return this.$store.getters.MAP_OBJECTS },
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
    <ObjectInfo />

    <MapCanvas :mapData="mapData">
        <PointCanvas :mapObjects="mapObjects" />
    </MapCanvas>
</template>