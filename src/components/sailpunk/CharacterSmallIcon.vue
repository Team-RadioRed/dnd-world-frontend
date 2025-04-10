<script>
export default {
    props: {
        data: Object,
    },
    methods: {
        openCharacter() {
            this.$store.dispatch("OPEN_OBJECT", this.data);
        }
    }
}
</script>


<template>
    <div @click="openCharacter" class="dt-small-icon">
        <img :src="data.img" />
        <div>
            <label>{{ data.name }}</label>
        </div>
    </div>
</template>