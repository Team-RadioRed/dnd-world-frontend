<script>
import CharacterButton from '@/components/character-list/CharacterButton.vue';
import ObjectInfo from '@/components/object-info/ObjectInfo.vue';

export default {
    computed: {
        characters() { return this.$store.getters.CHARACTERS_WANDERER }
    },
    components: {
        CharacterButton,
        ObjectInfo
    },
    async mounted() {
        await this.$store.dispatch("LOAD_CHARACTERS");
        await this.$store.dispatch("LOAD_MAP_OBJECTS");
    }
}
</script>

<template>
    <ObjectInfo />

    <div>
        <CharacterButton v-for="(character, index) in characters" :key="index" :data="character" />
    </div>
</template>