<script>
import SDTTitle from './SDTTitle.vue';

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
        SDTTitle
    },
    methods: {
        openChild(objectInfo) {
            this.$store.dispatch("OPEN_OBJECT", objectInfo);
        }
    },
    mounted() {
        if (!this.data.description) return;

        this.objectArray = [];
        this.data.description.forEach((id) => {
            this.objectArray.push(this.$store.getters.SUB_PAGE_BY_NAME(id));
        });
    },
}
</script>


<template>
    <div class="info-container info-column">
        <SDTTitle :title="data.name" :is-hide="data.isHideName" />
        <div class="dt-big-image-list">
            <div v-for="(item, index) in objectArray" :key="index" class="dt-big-image-container"
                @click="() => { openChild(item) }">
                <label class="dt-big-image-text">{{ item.name }}</label>
                <img :src="item.img" class="dt-big-image">
            </div>
        </div>
    </div>
</template>