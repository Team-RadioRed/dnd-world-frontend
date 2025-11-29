<script>
import SVGLiner from "./SVGLiner.vue";
import IconTag from "@/components/svg/IconTag.vue";
import IconCastle from "@/components/svg/IconCastle.vue";
import IconCountry from "@/components/svg/IconCountry.vue";
import IconVillage from "@/components/svg/IconVillage.vue";
import UIButton from "@/components/default/UIButton.vue";
import UIToggleButton from "@/components/default/UIToggleButton.vue";
import { getImageServer } from "@/assets/scripts/images";

export default {
    data() {
        return {
            isShowFilter: false,
            filterList: {
                "PROVINCE": {
                    icon: IconCountry
                },
                "CAPITAL": {
                    icon: IconCastle
                },
                "TOWN": {
                    icon: IconVillage
                }
            }
        }
    },
    components: {
        SVGLiner,
        UIButton,
        UIToggleButton,
        IconTag
    },
    computed: {
        worldParams() {
            const world = this.$store.getters.WORLD(this.$route.params.project);
            if (!world) return [];
            return this.$store.getters.WORLD(this.$route.params.project)
        },

        showProvince() { return this.$store.getters.SHOW_PROVINCE },
        showCapital() { return this.$store.getters.SHOW_CAPITAL },
        showTown() { return this.$store.getters.SHOW_TOWN }
    },
    methods: {
        getImageServer,
        toggleVisible() {
            this.isShowFilter = !this.isShowFilter;
        },
        toggleFilter(name) {
            let propertyName = `SHOW_${name}`;
            let value = null;
            switch (name) {
                case "PROVINCE":
                    value = this.showProvince;
                    break;
                case "CAPITAL":
                    value = this.showCapital;
                    break;
                case "TOWN":
                    value = this.showTown;
                    break;
            }

            this.$store.commit(propertyName, !value);
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
            switch (name) {
                case "PROVINCE":
                    return this.showProvince;
                case "CAPITAL":
                    return this.showCapital;
                case "TOWN":
                    return this.showTown;
            }
        }
    }
}
</script>


<template>
    <div v-if="isShowFilter" class="filter-panel">
        <UIToggleButton v-for="(value, name) in filterList" :key="name" :is-active="getState(name)" :name-filter="name"
            :click-method="toggleFilter">
            <component :is="value.icon" />
        </UIToggleButton>
    </div>

    <div class="left-panel">
        <!-- Filter -->
        <UIButton :click-method="toggleVisible">
            <IconTag />
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