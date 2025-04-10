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
    <img class="bottom-left-button" src="@/assets/images/wanderers.png" @click="openPanel" />
</template>