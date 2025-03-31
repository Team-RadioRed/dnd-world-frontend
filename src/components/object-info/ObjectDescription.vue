<script>
import DTSmallIcon from './DTSmallIcon.vue';
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