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
        <div>
            <img :src="data.img" class="dt-character-img">
            <label class="dt-character-text" v-for="(description, index) in data.description" :key="index">
                {{ description }}
            </label>
        </div>
    </SDTContainer>
</template>