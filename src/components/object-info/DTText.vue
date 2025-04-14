<script>
import SDTTitle from './SDTTitle.vue';

export default {
    props: {
        data: Object
    },
    components: {
        SDTTitle
    }
}
</script>


<template>
    <div class="info-container info-column">
        <SDTTitle :title="data.name" :is-hide="data.isHideName" />
        <label class="dt-text" v-for="(item, index) in data.description" :key="index">{{ item }}</label>
    </div>
</template>