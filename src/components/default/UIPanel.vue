<script>
import SVGLiner from "./SVGLiner.vue";
import UIButton from "@/components/default/UIButton.vue";
import UIToggleButton from "@/components/default/UIToggleButton.vue";
import UILayerButton from "@/components/default/UILayerButton.vue";
import { getImageServer } from "@/assets/scripts/images";

export default {
    data() {
        return {
            isShowFilter: false,
            isShowLayer: false
        }
    },
    components: {
        SVGLiner,
        UIButton,
        UIToggleButton,
        UILayerButton
    },
    computed: {
        worldParams() {
            const world = this.$store.getters.WORLD(this.$route.params.project);
            if (!world) return [];
            return this.$store.getters.WORLD(this.$route.params.project)
        },
        filters() { return this.$store.getters.FILTERS(this.$route.params.project) },
    },
    methods: {
        getImageServer,
        checkLayers() {
            if (!this.worldParams) return false;
            if (this.worldParams.layers?.length === 0) return false;
            return true
        },
        checkFilters() {
            if (!this.worldParams) return false;
            if (this.worldParams.filters.length === 0) return false;
            return true;
        },
        toggleVisible() {
            this.isShowFilter = !this.isShowFilter;
        },
        toggleFilter(name) {
            const filter = this.filters.find((filter) => filter.name === name);

            this.$store.commit("FILTER_STATE", {
                project: this.$route.params.project,
                name: name,
                value: !filter.state
            });
        },
        toggleLayer(name) {
            const layer = this.worldParams.layers.find((layer) => layer.name === name);
            layer.state = !layer.state;
        },
        showPanel(name) {
            const template = this.worldParams.bottomPanel.find(params => params.name === name);
            const description = [];

            // Добавление данных в объект с учётом тега
            template.description.forEach((value) => {
                description.push({
                    name: value.name,
                    type: "small-icon",
                    description: this.$store.getters.CHARACTERS(this.$route.params.project, value.tag),
                    isHideName: value.isHideName === true ? true : false
                });
            });

            // Открытие новой панели
            this.$store.dispatch("OPEN_OBJECT", {
                name: template.title,
                description: description
            });
        },
        getState(name) {
            const filter = this.filters.find((filter) => filter.name === name);
            return filter.state;
        }
    }
}
</script>


<template>
    <div class="layer-panel" v-if="checkLayers()">
        <div @click="isShowLayer = !isShowLayer" class="layer-panel-main-btn">
            Слои
        </div>
        <div v-if="isShowLayer" class="layer-panel-btn-container">
            <UILayerButton v-for="(value, index) in worldParams.layers" :key="index"
                :data="value"
                :click-method="toggleLayer"
            />
        </div>
    </div>

    <div v-if="isShowFilter" class="filter-panel">
        <UIToggleButton v-for="(value, index) in worldParams.filters" :key="index" :is-active="getState(value.name)"
            :name-filter="value.name" :click-method="toggleFilter">
            <SVGLiner :svgPath="value.icon" class="left-button" />
        </UIToggleButton>
    </div>

    <div class="left-panel">
        <!-- Filter -->
        <UIButton :click-method="toggleVisible" v-if="checkFilters">
            <SVGLiner svgPath="svg/point001.svg" class="left-button" />
        </UIButton>

        <!-- Buttons -->
        <UIButton v-for="(value, index) in worldParams.bottomPanel" :key="index" :click-method="showPanel"
            :button-name="value.name">
            <SVGLiner :svgPath="value.icon" class="left-button" />
        </UIButton>

        <!-- Return button -->
        <RouterLink :to="{ name: 'home' }" class="left-button return-menu-button">
            ◄
        </RouterLink>
    </div>
</template>