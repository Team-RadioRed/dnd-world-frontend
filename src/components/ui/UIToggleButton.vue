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
    <button @click="clickMethod(nameFilter)" :class="isActive ? 'toggle-button' : 'toggle-button toggle-button-disable'">
        <slot></slot>
    </button>
</template>