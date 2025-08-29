<script>
import SDTTitle from './SDTTitle.vue';

export default {
    data() {
        return {
            objectArray: [],
        }
    },
    mounted() {
        this.updateCharacter();
    },
    props: {
        data: Object,
    },
    components: {
        SDTTitle
    },
    methods: {
        updateCharacter() {
            this.objectArray = [];
            this.data.description.forEach((id) => {
                this.objectArray.push(this.$store.getters.CHARACTER_BY_NAME(id));
            });
        },
        openChild(objectInfo) {
            this.$store.dispatch("OPEN_OBJECT", objectInfo);
        },
        isDeathStyle(state) {
            if (state === true) {
                return "filter: grayscale(100%);";
            }
            else {
                return "";
            }
        },
        getImage(name) {
            const url = new URL(`../../assets/images/${name}`, import.meta.url).href;
            return url;
        }
    },
    watch: {
        data: {
            handler: function (val, oldVal) {
                this.updateCharacter();
            },
            deep: true
        }
    }
}
</script>


<template>
    <div>
        <SDTTitle :title="data.name" :is-hide="data.isHideName" />
        <div class="dt-small-icon-container">
            <div class="dt-small-icon" v-for="(item, index) in objectArray" :key="index"
                @click="() => { openChild(item) }">
                <div class="dt-small-icon-info">
                    <label class="dt-small-icon-info-title">{{ item.name }}</label>
                    <label class="sub-text">{{ item.additionalName }}</label>
                    <label class="dt-small-icon-tag">{{ item.fraction }}</label>
                </div>
                <div class="dt-small-icon-img">
                    <img :src="item.img" :style="isDeathStyle(item.isDeath)" />
                    <img v-if="item.isDeath" :src="getImage('skull.png')" class="dt-character-death-img">
                </div>
            </div>
        </div>
    </div>
</template>