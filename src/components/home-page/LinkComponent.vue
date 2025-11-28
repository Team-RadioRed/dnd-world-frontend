<script>
import { getImageServer } from '@/assets/scripts/images';

export default {
    props: {
        index: Number,
        data: Object
    },
    computed: {
        fixIndex() {
            return this.index.toString().padStart(3, 0);
        }
    },
    methods: {
        getImageServer
    }
}
</script>


<template>
    <RouterLink :to="{ name: 'map', params: { project: data.name } }"
        :class="data.isEnable ? 'home-page-url-component' : 'home-page-url-disable'">
        <img :src="getImageServer(data.image)" class="home-page-url-image">
        <div class="home-page-url-text-container">
            <label class="home-page-url-title">>> {{ data.title }}</label>
            <label class="home-page-url-description">{{ data.description }}</label>
        </div>
    </RouterLink>
</template>