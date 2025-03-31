<script>
import Point from './Point.vue';

export default {
    components: {
        Point,
    },
    props: {
        mapObjects: Object,
    }
}
</script>


<template>
    <div class="point-container">
        <Point v-for="(mapObject, index) in mapObjects" :key="index" :data="mapObject" />
    </div>
</template>