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
    <div class="additional-panel" v-if="isShow">
        <div class="additional-panel-title">
            <label>Персонажи напарники:</label>
            <button @click="closePanel">Закрыть</button>
        </div>
        <hr>

        <div class="dt-small-icon-container" style="padding: 10px;">
            <CharacterSmallIcon v-for="(character, index) in characters" :key="index" :data="character" />
        </div>
    </div>
</template>