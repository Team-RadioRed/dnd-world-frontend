<script>
import IconTemple from '../svg/IconTemple.vue';
import IconCompas from '../svg/IconCompas.vue';
import IconTeam from '../svg/IconTeam.vue';
import IconCrown from '../svg/IconCrown.vue';

export default {
    components: {
        IconCompas,
        IconTeam,
        IconTemple,
        IconCrown
    },
    methods: {
        showGods() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Боги",
                description: [{
                    name: "Пантеон",
                    type: "small-icon",
                    description: this.getCharacterData("pantheon"),
                }]
            });
        },
        showPartners() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Персонажи напарники",
                description: [{
                    name: "Название",
                    type: "small-icon",
                    description: this.getCharacterData("partners"),
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
                    description: this.getCharacterData("wanderer"),
                    isHideName: true
                }]
            });
        },
        showEmpire() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Персонажи из империи",
                description: [{
                    name: "Название",
                    type: "small-icon",
                    description: this.getCharacterData("empire"),
                    isHideName: true
                }]
            });
        },

        getCharacterData(name) {
            return this.$store.getters.CHARACTERS(name);
        }
    }
}
</script>


<template>
    <div class="additional-button">
        <div @click="showGods">
            <IconTemple />
        </div>
        <div @click="showEmpire">
            <IconCrown />
        </div>
        <div @click="showPartners">
            <IconTeam />
        </div>
        <div @click="showWanderers">
            <IconCompas />
        </div>
    </div>
</template>