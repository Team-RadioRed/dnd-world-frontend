<script>
import SVGLiner from "@/components/default/SVGLiner.vue";
import UIButton from "@/components/ui/UIButton.vue";
import UIToggleButton from "@/components/ui/UIToggleButton.vue";
import { getImageServer } from "@/assets/scripts/images";

export default {
    data() {
        return {
            isShowFilter: false,
            isShowLayer: false,
            isShowMap: false
        }
    },
    components: {
        SVGLiner,
        UIButton,
        UIToggleButton,
    },
    computed: {
        worldParams() {
            const data = this.$store.getters.WORLD_CONFIG;
            if (data == null) return null;
            if (Object.keys(data).length === 0) return null;
            return data;
        },
        checkLayer() {
            if (!this.worldParams) return false;
            if (Object.keys(this.worldParams.layer).length === 0) return false;
            return true
        },
        checkFilter() {
            if (!this.worldParams) return false;
            if (Object.keys(this.worldParams.filter).length === 0) return false;
            return true;
        },
        checkMap() {
            if (!this.worldParams) return false;
            if (Object.keys(this.worldParams.world).length === 0) return false;
            return true;
        }
    },
    methods: {
        getImageServer,
        
        //#region toggle visible
        toggleVisibleFilter() {
            const state = this.isShowFilter
            this.disableAllVisible();
            this.isShowFilter = !state;
        },
        toggleVisibleLayer() {
            const state = this.isShowLayer
            this.disableAllVisible();
            this.isShowLayer = !state;
        },
        toggleVisibleMap() {
            const state = this.isShowMap
            this.disableAllVisible();
            this.isShowMap = !state;
        },
        disableAllVisible() {
            this.isShowFilter = false;
            this.isShowLayer = false;
            this.isShowMap = false;
        },
        //#endregion

        //#region toggle filter
        toggleFilter(name) {
            const filter = this.worldParams.filter[name];

            this.$store.commit("WORLD_CONFIG_STATE", {
                key: "filter",
                name: name,
                value: !filter.state
            });
        },
        toggleLayer(name) {
            const layer = this.worldParams.layer[name];
            
            this.$store.commit("WORLD_CONFIG_STATE", {
                key: "layer",
                name: name,
                value: !layer.state
            });
        },
        //#endregion toggle filter

        showPanel(name) {
            const template = this.worldParams.group[name];
            const description = [];

            // Добавление данных в объект с учётом тега
            template.description.forEach((value) => {
                description.push({
                    name: value.name,
                    type: "small-icon",
                    description: this.$store.getters.CHARACTER_BY_TAG(this.$route.params.project, value.tag),
                    isHideName: value.isHideName === true ? true : false
                });
            });

            // Открытие новой панели
            this.$store.dispatch("OPEN_OBJECT", {
                name: template.title,
                description: description
            });
        }
    }
}
</script>


<template>
    <!-- Additional layer -->
    <div v-if="worldParams != null" class="filter-panel">
        <!-- Filter list -->
        <div v-if="isShowFilter" class="filter-panel-content">
            <UIToggleButton v-for="(value, index) in worldParams.filter" 
                :key="index" 
                :is-active="value.state"
                :name-filter="index" 
                :click-method="toggleFilter"
            >
                {{ value.displayName }}
            </UIToggleButton>
        </div>

        <!-- Layer list -->
        <div v-if="isShowLayer" class="filter-panel-content">
            <UIToggleButton v-for="(value, index) in worldParams.layer" 
                :key="index" 
                :is-active="value.state"
                :name-filter="index" 
                :click-method="toggleLayer"
            >
                {{ value.displayName }}
            </UIToggleButton>
        </div>

        <!-- Map list -->
        <div v-if="isShowMap" class="filter-panel-content">
            <RouterLink 
                v-for="(value, index) in worldParams.world" 
                :key="index"
                :to="{ 
                    name: 'map', 
                    params: { 
                        project: this.$route.params.project, 
                        map: index 
                    } 
                }" 
                class="toggle-button"
            >
                {{ value.displayName }}
            </RouterLink>
        </div>
    </div>

    <div class="left-panel" v-if="worldParams != null">
        <!-- ==================== -->
        <!-- Filter -->
        <UIButton :click-method="toggleVisibleFilter" v-if="checkFilter">
            <SVGLiner svgPath="svg/point001.svg" class="left-button" />
        </UIButton>
        <!-- Layer -->
        <UIButton :click-method="toggleVisibleLayer" v-if="checkLayer">
            <SVGLiner svgPath="svg/layer001.svg" class="left-button" />
        </UIButton>
        <!-- Map -->
        <UIButton :click-method="toggleVisibleMap" v-if="checkMap">
            <SVGLiner svgPath="svg/world001.svg" class="left-button" />
        </UIButton>
        <div class="filter-splitter"></div>
        <!-- ==================== -->

        <!-- ==================== -->
        <!-- Buttons -->
        <UIButton v-for="(value, index) in worldParams.group" 
            :key="index" 
            :click-method="showPanel"
            :button-name="index">
            <SVGLiner :svgPath="value.icon" class="left-button" />
        </UIButton>
        <!-- ==================== -->

        <!-- ==================== -->
        <!-- Return button -->
        <RouterLink :to="{ name: 'home' }" class="left-button return-menu-button">
            ◄
        </RouterLink>
        <!-- ==================== -->
    </div>
</template>