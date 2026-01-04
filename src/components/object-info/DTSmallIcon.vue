<script>
import SDTContainer from './SDTContainer.vue';
import { getImageServer, getImageInAssets } from '@/assets/scripts/images';

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
        SDTContainer
    },
    methods: {
        getImageServer,
        getImageInAssets,
        updateCharacter() {
            this.objectArray = [];
            this.data.description.forEach((id) => {
                this.objectArray.push(this.$store.getters.CHARACTER_BY_NAME(this.$route.params.project, id));
            });
        },
        openChild(objectInfo) {
            this.$store.dispatch("OPEN_OBJECT", objectInfo);
        },
        isDeathStyle(state) {
            const value = state === true || state === "true" ? "filter: grayscale(100%);" : "";
            return value;
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
    <SDTContainer :title="data.name" :title-hide="data.isHideName">
        <div class="dt-small-icon-container">
            <div class="dt-small-icon" v-for="(item, index) in objectArray" :key="index"
                @click="() => { openChild(item) }">
                <div class="dt-small-icon-info">
                    <label class="dt-small-icon-info-title">{{ item.name }}</label>
                    <label class="sub-text">{{ item.additionalName }}</label>
                    <label class="dt-small-icon-tag">{{ item.fraction }}</label>
                </div>
                <div class="dt-small-icon-img">
                    <img :src="getImageServer(item.img, this.$route.params.project)"
                        :style="isDeathStyle(item.isDeath)" />
                    <img v-if="item.isDeath" :src="getImageInAssets('../skull.png')" class="dt-character-death-img">
                </div>
            </div>
        </div>
    </SDTContainer>
</template>