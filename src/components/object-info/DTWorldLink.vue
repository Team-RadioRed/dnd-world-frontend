<script>
import SDTContainer from './SDTContainer.vue';
import { getImageServer } from '@/assets/scripts/images.js';

export default {
    props: {
        data: Object
    },
    components: {
        SDTContainer
    },
    methods: {
        getImageServer
    }
}
</script>


<template>
    <SDTContainer :title="data.name" :title-hide="data.isHideName">
        <div class="dt-big-image-list">
            <RouterLink 
                v-for="(item, index) in data.description" :key="index"
                :to="{ 
                    name: 'map', 
                    params: { 
                        project: this.$route.params.project, 
                        map: item.link 
                    } 
                }" 
                class="dt-big-image-container dt-text-unlink"
            >
                <img 
                    :src="getImageServer(
                        item.img, 
                        this.$route.params.project
                    )" 
                    class="dt-big-image"
                >
                <div class="dt-big-image-text">
                    <label>{{ item.name }}</label>
                </div>
            </RouterLink>
        </div>
    </SDTContainer>
</template>