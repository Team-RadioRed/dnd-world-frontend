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
        <div class="info-column-row-gap">
            <div v-for="(description, index) in data.description" :key="index" class="dt-skill-container">
                <label class="dt-skill-title">◢ {{ description.name }}</label>
                <label>{{ description.description }}</label>
            </div>
        </div>
    </SDTContainer>
</template>