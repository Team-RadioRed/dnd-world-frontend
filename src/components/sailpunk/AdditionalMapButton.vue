<script>
import IconTemple from '../svg/IconTemple.vue';
import IconCompas from '../svg/IconCompas.vue';
import IconTeam from '../svg/IconTeam.vue';

export default {
    computed: {
        characterPartners() { return this.$store.getters.CHARACTERS_PARTNERS },
        characterWanderers() { return this.$store.getters.CHARACTERS_WANDERER },
        characterGods() { return this.$store.getters.CHARACTERS_GODS },
    },
    components: {
        IconCompas,
        IconTeam,
        IconTemple
    },
    methods: {
        showGods() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Боги",
                description: [{
                    name: "Пантеон",
                    type: "small-icon",
                    description: this.characterGods
                }]
            });
        },
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
        <div @click="showGods">
            <IconTemple />
        </div>
        <div @click="showPartners">
            <IconTeam />
        </div>
        <div @click="showWanderers">
            <IconCompas />
        </div>
    </div>
</template>