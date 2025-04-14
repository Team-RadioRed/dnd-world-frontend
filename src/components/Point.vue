<script>
import { POINT_COLOR } from '@/storage/constants';

export default {
    props: {
        data: Object
    },
    computed: {
        getPosition() {
            return {
                transform: `translate(${this.data.pos.x}px, ${this.data.pos.y}px)`
            };
        },
        openObject() {
            this.$store.dispatch("OPEN_OBJECT", this.data);
        },
        color() { return POINT_COLOR[this.data.type] }
    }
}
</script>


<template>
    <div class="point" :style="getPosition" @click="openObject" @touchend="openObject">
        <div :style="{ backgroundColor: `${color}7f`, border: `3px solid ${color}` }"></div>
        <label>{{ data.name }}</label>
    </div>
</template>