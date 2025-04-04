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
        <label>{{ data.name }}</label>
        <hr>
        <div>
            <button v-for="(item, index) in objectArray" :key="index" @click="() => { openChild(item) }">{{
                item.name
                }}</button>
        </div>
    </div>
</template>