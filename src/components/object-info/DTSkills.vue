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
        <div class="info-column-row-gap">
            <div v-for="(description, index) in data.description" :key="index" class="dt-skill-container">
                <label class="dt-skill-title">◢ {{ description.name }}</label>
                <label>{{ description.description }}</label>
            </div>
        </div>
    </div>
</template>