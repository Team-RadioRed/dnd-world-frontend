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
    <div class="info-container">
        <SDTTitle :title="data.name" :is-hide="data.isHideName" />

        <div v-for="(item, index) in data.description" :key="index" class="dt-note-container">
            <label class="dt-note-description">« {{ item.description }} »</label>
            <label class="dt-note-name">{{ item.name }}</label>
        </div>
    </div>
</template>