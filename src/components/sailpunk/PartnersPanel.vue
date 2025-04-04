<script>
import CharacterSmallIcon from './CharacterSmallIcon.vue';

export default {
    components: {
        CharacterSmallIcon
    },
    computed: {
        characters() { return this.$store.getters.CHARACTERS_PARTNERS },
        isShow() { return this.$store.getters.IS_SHOW_PARTNERS_PANEL }
    },
    methods: {
        closePanel() {
            this.$store.commit("IS_SHOW_PARTNERS_PANEL", false);
        }
    }
}
</script>


<template>
    <div class="additional-map-panel" v-if="isShow">
        <label>Персонажи напарники:</label>
        <button @click="closePanel">Close</button>

        <CharacterSmallIcon v-for="(character, index) in characters" :key="index" :data="character" />
    </div>
</template>