<script>
import DTCharacter from './DTCharacter.vue';
import DTSkills from './DTSkills.vue';
import DTSmallIcon from './DTSmallIcon.vue';
import DTStats from './DTStats.vue';
import DTSubPage from './DTSubPage.vue';
import DTText from './DTText.vue';

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
        },
        getComponent(componentType) {
            switch (componentType) {
                case "text":
                    return DTText;
                case "small-icon":
                    return DTSmallIcon;
                case "character":
                    return DTCharacter;
                case "stats":
                    return DTStats;
                case "skills":
                    return DTSkills;
                case "sub-page":
                    return DTSubPage;
            }
        }
    }
}
</script>


<template>
    <div class="panel-fade" v-if="isShow">
        <div class="panel-close" @click="closeAll" />
        <div class="info-controller">
            <button @click="closeCurrent" class="info-controller-button" v-if="objectList.length > 1">◄</button>
            <button @click="closeAll" class="info-controller-button info-controller-close">✖</button>
        </div>
        <div class="info-panel">
            <div class="info-panel-title">
                <label>{{ currentObject.name }}</label>
            </div>
            <div class="info-description">
                <component v-for="(item, index) in currentObject.description" :key="index" :is="getComponent(item.type)"
                    :data="item" />
            </div>
        </div>
    </div>
</template>