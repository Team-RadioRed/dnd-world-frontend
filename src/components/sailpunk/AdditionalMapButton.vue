<script>
export default {
    computed: {
        characterPartners() { return this.$store.getters.CHARACTERS_PARTNERS },
        characterWanderers() { return this.$store.getters.CHARACTERS_WANDERER }
    },
    methods: {
        showPartners() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Персонажи напарники",
                description: [{
                    name: "Название",
                    type: "small-icon",
                    description: this.characterPartners,
                    isHideName: true
                }]
            });
        },
        showWanderers() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Странствующие персонажи",
                description: [{
                    name: "Название",
                    type: "small-icon",
                    description: this.characterWanderers,
                    isHideName: true
                }]
            });
        }
    }
}
</script>


<template>
    <div class="additional-button">
        <img src="@/assets/images/partners.png" @click="showPartners">
        <img src="@/assets/images/wanderers.png" @click="showWanderers">
    </div>
</template>