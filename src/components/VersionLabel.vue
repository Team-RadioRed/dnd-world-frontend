<script>
import { VERSION } from '@/storage/constants';

export default {
    computed: {
        version() { return VERSION }
    }
}
</script>

<template>
    <label class="version-label">{{ version }}</label>
</template>