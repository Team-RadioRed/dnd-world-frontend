<script>
import IconTemple from '../svg/IconTemple.vue';
import IconCompas from '../svg/IconCompas.vue';
import IconTeam from '../svg/IconTeam.vue';

export default {
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
        getCharacterData(name) {
            let characters = this.$store.getters.CHARACTERS(name);
            characters = characters.map((character) => character["_id"]);
            return characters;
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