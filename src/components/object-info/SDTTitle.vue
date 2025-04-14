<script>
export default {
    props: {
        title: String,
        isHide: Boolean
    }
}
</script>


<template>
    <label class="info-container-title" v-if="isHide != true">{{ title }}</label>
</template>