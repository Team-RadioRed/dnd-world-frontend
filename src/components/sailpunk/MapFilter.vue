<script>
import IconTag from '../svg/IconTag.vue';

export default {
    components: {
        IconTag
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        toggleVisible() {
            this.isShow = !this.isShow;
        },
        toggleProvince() {
            this.$store.commit("SHOW_PROVINCE", !this.showProvince);
        },
        toggleCapital() {
            this.$store.commit("SHOW_CAPITAL", !this.showCapital);
        },
        toggleTown() {
            this.$store.commit("SHOW_TOWN", !this.showTown);
        }
    },
    computed: {
        showProvince() { return this.$store.getters.SHOW_PROVINCE },
        showCapital() { return this.$store.getters.SHOW_CAPITAL },
        showTown() { return this.$store.getters.SHOW_TOWN }
    }
}
</script>


<template>
    <div class="map-filter-pos">
        <div v-if="isShow" class="map-filter-panel">
            <div @click="toggleProvince">
                <svg width="14px" height="14px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="7" fill="#d8dee9" />
                    <circle cx="7" cy="7" r="5" :fill="showProvince ? '#ff0000' : '#b20000'" />
                </svg>
                <label for="province-tgl">Провинции</label>
            </div>
            <div @click="toggleCapital">
                <svg width="14px" height="14px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="7" fill="#d8dee9" />
                    <circle cx="7" cy="7" r="5" :fill="showCapital ? '#ff9100' : '#b26500'" />
                </svg>
                <label for="capital-tgl">Столицы</label>
            </div>
            <div @click="toggleTown">
                <svg width="14px" height="14px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="7" fill="#d8dee9" />
                    <circle cx="7" cy="7" r="5" :fill="showTown ? '#3A76EA' : '#2852a3'" />
                </svg>
                <label for="town-tgl">Города</label>
            </div>
        </div>
        <div class="map-filter-button" @click="toggleVisible">
            <IconTag />
        </div>
    </div>
</template>