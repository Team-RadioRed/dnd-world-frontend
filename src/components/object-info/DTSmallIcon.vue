<script>
export default {
    data() {
        return {
            objectArray: [],
        }
    },
    props: {
        data: Object,
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
        }
    }
}
</script>


<template>
    <div class="info-container">
        <label class="info-container-title">{{ data.name }}</label>
        <div class="dt-small-icon-container">
            <div class="dt-small-icon" v-for="(item, index) in objectArray" :key="index"
                @click="() => { openChild(item) }">
                <img :src="item.previeImage" />
                <div>
                    <label>{{ item.name }}</label>
                </div>
            </div>
        </div>
    </div>
</template>