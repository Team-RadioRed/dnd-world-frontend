<script>
import { getImageLocal } from "@/assets/scripts/images";

export default {
    data() {
        return {
            svgContent: ""
        }
    },
    props: {
        svgPath: String
    },
    async mounted() {
        const response = await fetch(getImageLocal(this.svgPath));
        this.svgContent = await response.text();
    }
}
</script>


<template>
    <div v-html="svgContent"></div>
</template>