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
    <img class="bottom-left-button" style="bottom: 84px;" src="@/assets/images/partners.png" @click="openPanel" />
</template>