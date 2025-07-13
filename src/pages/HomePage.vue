<script>
import LinkComponent from '@/components/home-page/LinkComponent.vue';
import { VERSION, HOME_PAGES } from '@/storage/constants';

export default {
    components: {
        LinkComponent
    },
    computed: {
        version() { return VERSION },
        links() { return HOME_PAGES }
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
            <LinkComponent v-for="(link, index) in links" :key="index" :index="index" :link="link" />
        </div>
    </div>
</template>