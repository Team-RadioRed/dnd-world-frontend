<script>
export default {
    props: {
        index: Number,
        link: Object
    },
    computed: {
        fixIndex() {
            return this.index.toString().padStart(3, 0);
        }
    }
}
</script>


<template>
    <RouterLink :to="{ name: link.name }" class="home-page-url-component">
        <img :src="`https://radiored.ru/images/worlds/w${fixIndex}.jpg`" class="home-page-url-image">
        <div class="home-page-url-text-container">
            <label class="home-page-url-title">>> {{ link.title }}</label>
            <label class="home-page-url-description">{{ link.description }}</label>
        </div>
    </RouterLink>
</template>