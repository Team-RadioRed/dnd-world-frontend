<script>

export default {
    props: {
        data: Object,
        clickMethod: Function
    }
}
</script>

<template>
    <div :class="data.state ? 'layer-panel-btn layer-panel-btn-active' : 'layer-panel-btn'"
        @click="clickMethod(data.name)"
    >
        {{ data.displayName }}
    </div>
</template>