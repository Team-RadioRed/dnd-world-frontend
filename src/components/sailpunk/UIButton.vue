<script>
export default {
    props: {
        clickMethod: Function
    }
}
</script>


<template>
    <button @click="clickMethod" class="sailpunk-button">
        <slot></slot>
    </button>
</template>