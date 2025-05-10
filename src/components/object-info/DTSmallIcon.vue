<script>
import SDTTitle from './SDTTitle.vue';

export default {
    data() {
        return {
            objectArray: [],
        }
    },
    props: {
        data: Object,
    },
    components: {
        SDTTitle
    },
    mounted() {
        if (!this.data.description) return;

        this.objectArray = [];
        this.data.description.forEach((id) => {
            this.objectArray.push(this.$store.getters.CHARACTER_BY_NAME(id));
        });
    },
    methods: {
        openChild(objectInfo) {
            this.$store.dispatch("OPEN_OBJECT", objectInfo);
        },
        isDeathStyle(state) {
            console.log(state);
            if (state === true) {
                return "filter: grayscale(100%);";
            }
            else {
                return "";
            }
        },
        getImage(name) {
            const url = new URL(`../../assets/images/${name}`, import.meta.url).href;
            console.log(url);
            return url;
        }
    }
}
</script>


<template>
    <div class="info-container">
        <SDTTitle :title="data.name" :is-hide="data.isHideName" />
        <div class="dt-small-icon-container">
            <div class="dt-small-icon" v-for="(item, index) in objectArray" :key="index"
                @click="() => { openChild(item) }">
                <div class="dt-small-icon-img">
                    <img :src="item.img" :style="isDeathStyle(item.isDeath)" />
                    <img v-if="item.isDeath" :src="getImage('skull.png')" class="dt-character-death-img">
                    <div></div>
                </div>
                <div class="dt-small-icon-bottom">
                    <div class="left-block">
                        <label>{{ item.name }}</label>
                        <label class="sub-text">{{ item.additionalName }}</label>
                    </div>
                    <label class="right-block">{{ item.fraction }}</label>
                </div>
            </div>
        </div>
    </div>
</template>