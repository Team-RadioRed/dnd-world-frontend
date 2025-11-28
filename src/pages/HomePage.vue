<script>
import LinkComponent from '@/components/home-page/LinkComponent.vue';
import { VERSION } from '@/storage/constants';

export default {
    components: {
        LinkComponent
    },
    computed: {
        version() { return VERSION },
        worlds() { return this.$store.getters.WORLDS },
    },
    async mounted() {
        await this.$store.dispatch("LOAD_WORLDS");
    }
}
</script>


<template>
    <div class="home-page-main-container">
        <div class="home-page-header-container">
            <label>Проекты __</label>
            <label class="home-page-version">версия: {{ version }}</label>
        </div>

        <div class="home-page-url-container">
            <LinkComponent v-for="(world, index) in worlds" :key="index" :index="index" :data="world" />
        </div>
    </div>
</template>