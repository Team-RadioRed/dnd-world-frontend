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
    <div>
        <SDTTitle :title="data.name" :is-hide="data.isHideName" />
        <img :src="data.img" class="dt-character-img">
        <label class="dt-character-text" v-for="(description, index) in data.description" :key="index">
            {{ description }}
        </label>
    </div>
</template>