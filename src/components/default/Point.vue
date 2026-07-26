<script>

export default {
    props: {
        data: Object,
        color: String
    },
    computed: {
        getPosition() {
            return {
                transform: `translate(${this.data.pos.x}px, ${this.data.pos.y}px)`
            };
        },
        openObject() {
            this.$store.dispatch("OPEN_OBJECT", this.data);
        }
    }
}
</script>


<template>
    <div class="point" :style="getPosition" @click="openObject" @touchend="openObject">
        <div class="point-icon" :style="{ backgroundColor: `${color}` }" />
        <label class="point-label">{{ filters }}{{ data.name }}</label>
    </div>
</template>