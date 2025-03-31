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
        <button class="info-additonal-button" style="top: 10px;" @click="closeAll">Close</button>
        <button class="info-additonal-button" style="top: 40px;" @click="closeCurrent"
            v-if="objectList.length > 1">Preview</button>

        <div class="info-panel">
            <label>{{ currentObject.name }}:</label>
            <hr>
            <ObjectDescription :data="currentObject.description" />
        </div>
    </div>
</template>