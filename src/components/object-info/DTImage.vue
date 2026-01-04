<script>
import SDTContainer from './SDTContainer.vue';
import { getImageServer } from '@/assets/scripts/images';

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
        <img class="dt-image" :src="getImageServer(data.img, this.$route.params.project)">
    </SDTContainer>
</template>