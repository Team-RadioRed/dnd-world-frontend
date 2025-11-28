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
        <div>
            <img :src="getImageServer(data.img, 'sailpunk')" class="dt-character-img">
            <label class="dt-character-text" v-for="(description, index) in data.description" :key="index">
                {{ description }}
            </label>
        </div>
    </SDTContainer>
</template>