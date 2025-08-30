<script>
import DTCharacter from './DTCharacter.vue';
import DTSkills from './DTSkills.vue';
import DTSmallIcon from './DTSmallIcon.vue';
import DTStats from './DTStats.vue';
import DTSubPage from './DTSubPage.vue';
import DTText from './DTText.vue';

export default {
    props: {
        data: Object
    },
    methods: {
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
    <div class="info-description">
        <component v-for="(item, index) in data" :key="index" :is="getComponent(item.type)" :data="item" />
    </div>
</template>