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
    <div class="info-container info-column" style="row-gap: 10px;">
        <SDTTitle :title="data.name" :is-hide="data.isHideName" />
        <div v-for="(description, index) in data.description" :key="index" class="dt-skill-container">
            <div></div>
            <label><b>{{ description.name }}</b></label>
            <label> - {{ description.description }}</label>
        </div>
    </div>
</template>