<script>
export default {
    props: {
        data: Object
    }
}
</script>


<template>
    <div class="info-container info-column">
        <label>{{ data.name }}</label>
        <label v-for="(item, index) in data.description" :key="index">{{ item }}</label>
        <hr>
    </div>
</template>