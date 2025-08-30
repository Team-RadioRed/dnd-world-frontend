<script>
export default {
    data() {
        return {
            isShow: true
        }
    },
    props: {
        title: String,
        titleHide: Boolean
    },
    methods: {
        toggleShow() {
            this.isShow = !this.isShow;
        }
    }
}
</script>


<template>
    <div class="info-column">
        <label class="info-container-title" v-if="titleHide != true" @click="toggleShow">
            {{ isShow ? "⇲" : "⇱" }} {{ title }}
        </label>
        <slot v-if="isShow"></slot>
    </div>
</template>