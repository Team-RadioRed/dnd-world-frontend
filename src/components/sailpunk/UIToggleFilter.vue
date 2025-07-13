<script>
export default {
    props: {
        state: Boolean,
        clickMethod: Function,
        dataObject: Object,
    },
    computed: {
        currentColor() { return this.state ? this.dataObject.mainColor : this.dataObject.disableColor }
    }
}
</script>


<template>
    <div @click="clickMethod" class="sailpunk-filter-label left-border">
        <label for="capital-tgl">{{ dataObject.name }}</label>
    </div>
</template>


<style scoped>
.left-border {
    border-left: 10px solid v-bind(currentColor);
}
</style>