<script>
import MapCanvas from '@/components/MapCanvas.vue';
import ObjectInfo from '@/components/object-info/ObjectInfo.vue';
import PointCanvas from '@/components/PointCanvas.vue';
import PartnersButton from '@/components/sailpunk/PartnersButton.vue';
import PartnersPanel from '@/components/sailpunk/PartnersPanel.vue';
import WandererButton from '@/components/sailpunk/WandererButton.vue';
import WandererPanel from '@/components/sailpunk/WandererPanel.vue';

export default {
    components: {
        MapCanvas,
        PointCanvas,
        ObjectInfo,
        WandererButton,
        WandererPanel,
        PartnersButton,
        PartnersPanel
    },
    computed: {
        mapData() { return this.$store.getters.MAP_DATA },
        mapObjects() { return this.$store.getters.MAP_OBJECTS },
    },
    async mounted() {
        await this.$store.dispatch("LOAD_CHARACTERS");
        await this.$store.dispatch("LOAD_MAP_OBJECTS");
    }
}
</script>


<template>
    <ObjectInfo />

    <WandererButton />
    <WandererPanel />

    <PartnersButton />
    <PartnersPanel />

    <MapCanvas :mapData="mapData">
        <PointCanvas :mapObjects="mapObjects" />
    </MapCanvas>
</template>