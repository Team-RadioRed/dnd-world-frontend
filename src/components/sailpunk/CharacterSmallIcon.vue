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
    <button @click="openCharacter">{{ data.name }}</button>
</template>