<script>
import Point from './Point.vue';

export default {
    components: {
        Point,
    },
    props: {
        mapObjects: Object,
    },
    methods: {
        color(filterName) {
            let color = "#FFFFFF";
            if (filterName == null) return color;

            const mapData = this.$store.getters.WORLD_BY_NAME(
                this.$route.params.project, 
                this.$route.params.map
            );
            mapData.filters.forEach((filter) => {
                if (filter.name === filterName) color = filter.color;
            });
            
            return color;
        },
    }
}
</script>


<template>
    <div class="point-container">
        <Point v-for="(mapObject, index) in mapObjects" :key="index" :data="mapObject" :color="color(mapObject.type)" />
    </div>
</template>