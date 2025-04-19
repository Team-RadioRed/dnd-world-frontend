<script>
import ObjectDescription from './ObjectDescription.vue'

export default {
    computed: {
        currentObject() { return this.$store.getters.CURRENT_OBJECT },
        objectList() { return this.$store.getters.OBJECT_LIST },
        isShow() { return this.$store.getters.OBJECT_SHOW },
    },
    methods: {
        closeAll() {
            this.$store.dispatch("CLOSE_ALL");
        },
        closeCurrent() {
            this.$store.dispatch("CLOSE_OBJECT");
        }
    },
    components: {
        ObjectDescription
    }
}
</script>


<template>
    <div class="panel-fade" v-if="isShow">
        <div class="info-controller">
            <button @click="closeCurrent" v-if="objectList.length > 1">Назад</button>
            <button @click="closeAll">Закрыть</button>
        </div>
        <div class="info-panel">
            <div class="info-panel-title">
                <label>{{ currentObject.name }}</label>
            </div>
            <ObjectDescription :data="currentObject.description" />
        </div>
    </div>
</template>