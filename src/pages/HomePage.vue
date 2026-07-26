<script>
import LinkComponent from '@/components/home-page/LinkComponent.vue';
import { VERSION } from '@/storage/constants';

export default {
    components: {
        LinkComponent
    },
    computed: {
        version() { return VERSION },
        world() { return this.$store.getters.WORLD },
    },
    async mounted() {
        await this.$store.dispatch("LOAD_WORLD");
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
            <LinkComponent v-for="(worldData, index) in world" :key="index" :index="index" :data="worldData.main" />
        </div>
    </div>
</template>