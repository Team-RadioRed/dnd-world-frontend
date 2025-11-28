<script>
import SDTContainer from './SDTContainer.vue';
import { getImageServer } from '@/assets/scripts/images';

export default {
    data() {
        return {
            objectArray: []
        }
    },
    props: {
        data: Object
    },
    components: {
        SDTContainer
    },
    methods: {
        getImageServer,
        openChild(objectInfo) {
            this.$store.dispatch("OPEN_OBJECT", objectInfo);
        }
    },
    mounted() {
        if (!this.data.description) return;

        this.objectArray = [];
        this.data.description.forEach((id) => {
            this.objectArray.push(this.$store.getters.SUB_PAGE_BY_NAME(this.$route.params.project, id));
        });
    },
}
</script>


<template>
    <SDTContainer :title="data.name" :title-hide="data.isHideName">
        <div class="dt-big-image-list">
            <div v-for="(item, index) in objectArray" :key="index" class="dt-big-image-container"
                @click="() => { openChild(item) }">
                <img :src="getImageServer(item.img, this.$route.params.project)" class="dt-big-image">
                <div class="dt-big-image-text">
                    <label>{{ item.name }}</label>
                </div>
            </div>
        </div>
    </SDTContainer>
</template>