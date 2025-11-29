<script>
import { DEFAULT_POINT_COLOR } from '@/storage/constants';

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
        color() {
            const filter = this.$store.getters.FILTER_VALUE(this.$route.params.project, this.data.type);
            return filter.color ? filter.color : DEFAULT_POINT_COLOR;
        },
    }
}
</script>


<template>
    <div class="point" :style="getPosition" @click="openObject" @touchend="openObject">
        <div class="point-icon" :style="{ backgroundColor: `${color}` }" />
        <label class="point-label">{{ filters }}{{ data.name }}</label>
    </div>
</template>