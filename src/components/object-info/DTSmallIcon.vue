<script>
export default {
    props: {
        data: Object
    },
    methods: {
        openChild(data) {
            this.$store.dispatch("OPEN_OBJECT", data);
        }
    }
}
</script>


<template>
    <div class="info-container">
        <label>{{ data.name }}</label>
        <hr>
        <div>
            <button v-for="(item, index) in data.description" :key="index" @click="() => { openChild(item) }">{{ item.name
                }}</button>
        </div>
    </div>
</template>