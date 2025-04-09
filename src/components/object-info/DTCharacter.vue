<script>
export default {
    props: {
        data: Object
    }
}
</script>


<template>
    <div class="info-container">
        <label class="info-container-title">{{ data.name }}</label>
        <img :src="data.img" class="dt-character-img">
        <label>Test</label>
    </div>
</template>