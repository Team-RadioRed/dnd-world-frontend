<script>
export default {
    props: {
        nameFilter: String,
        clickMethod: Function,
        isActive: Boolean
    }
}
</script>


<template>
    <button @click="clickMethod(nameFilter)" :class="isActive ? 'left-button' : 'left-button left-button-disable'">
        <slot></slot>
    </button>
</template>