<script>
export default {
    methods: {
        openPanel() {
            this.$store.commit("IS_SHOW_WANDERER_PANEL", true);
        }
    }
}
</script>


<template>
    <button class="bottom-left-button" @click="openPanel">
        Странствующие персонажи
    </button>
</template>