<script>
export default {
    props: {
        data: Object
    },
    computed: {
        getPosition() {
            return {
                transform: `translate(${this.data.pos.x}px, ${this.data.pos.y}px)`,
            };
        },
        openObject() {
            this.$store.dispatch("OPEN_OBJECT", this.data);
        }
    }
}
</script>


<template>
    <div class="point" :style="getPosition" @click="openObject">
        <label>{{ data.name }}</label>
    </div>
</template>