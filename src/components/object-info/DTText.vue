<script>
import SDTContainer from './SDTContainer.vue';

export default {
    props: {
        data: Object
    },
    components: {
        SDTContainer
    }
}
</script>


<template>
    <SDTContainer :title="data.name" :title-hide="data.isHideName">
        <label class="dt-text" v-for="(item, index) in data.description" :key="index">{{ item }}</label>
    </SDTContainer>
</template>