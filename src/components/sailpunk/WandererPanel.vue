<script>
import CharacterSmallIcon from './CharacterSmallIcon.vue';

export default {
    components: {
        CharacterSmallIcon
    },
    computed: {
        isShow() { return this.$store.getters.IS_SHOW_WANDERER_PANEL },
        characters() { return this.$store.getters.CHARACTERS_WANDERER }
    },
    methods: {
        closePanel() {
            this.$store.commit("IS_SHOW_WANDERER_PANEL", false);
        }
    }
}
</script>


<template>
    <div class="additional-map-panel" v-if="isShow">
        <button @click="closePanel">Close</button>

        <CharacterSmallIcon v-for="(character, index) in characters" :key="index" :data="character" />
    </div>
</template>