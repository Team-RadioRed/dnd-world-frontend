<script>
export default {
    methods: {
        openPanel() {
            this.$store.commit("IS_SHOW_PARTNERS_PANEL", true);
        }
    }
}
</script>


<template>
    <button class="bottom-left-button" style="bottom: 40px;" @click="openPanel">Персонажи напарники</button>
</template>