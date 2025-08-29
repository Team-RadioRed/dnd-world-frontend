<script>
export default {
    props: {
        buttonName: String,
        clickMethod: Function
    }
}
</script>


<template>
    <button @click="clickMethod(buttonName)" class="left-button">
        <slot></slot>
    </button>
</template>