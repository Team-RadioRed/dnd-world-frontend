<script>
import IconTemple from "@/components/svg/IconTemple.vue";
import IconCompas from "@/components/svg/IconCompas.vue";
import IconTeam from "@/components/svg/IconTeam.vue";
import IconCrown from "@/components/svg/IconCrown.vue";
import IconTag from "@/components/svg/IconTag.vue";
import IconCastle from "@/components/svg/IconCastle.vue";
import IconCountry from "@/components/svg/IconCountry.vue";
import IconVillage from "@/components/svg/IconVillage.vue";
import UIButton from "@/components/default/UIButton.vue";
import UIToggleButton from "@/components/default/UIToggleButton.vue";

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
            },
            buttonList: {
                "GODS": {
                    icon: IconTemple,
                    title: "Боги",
                    description: [
                        {
                            name: "Пантеон",
                            tag: "pantheon",
                        },
                        {
                            name: "Малые боги",
                            tag: "smallGods"
                        },
                        {
                            name: "Забытые боги",
                            tag: "forgottenGods"
                        },
                        {
                            name: "Древние боги",
                            tag: "oldGods"
                        }
                    ]
                },
                "EMPIRE": {
                    icon: IconCrown,
                    title: "Персонажи из империи",
                    description: [
                        {
                            name: "Название",
                            tag: "empire",
                            isHideName: true
                        }
                    ]
                },
                "PARTNERS": {
                    icon: IconTeam,
                    title: "Персонажи напарники",
                    description: [
                        {
                            name: "Название",
                            tag: "partners",
                            isHideName: true
                        }
                    ]
                },
                "WANDERING": {
                    icon: IconCompas,
                    title: "Странствующие персонажи",
                    description: [
                        {
                            name: "Название",
                            tag: "wanderer",
                            isHideName: true
                        }
                    ]
                }
            }
        }
    },
    components: {
        UIButton,
        UIToggleButton,
        IconTag
    },
    computed: {
        showProvince() { return this.$store.getters.SHOW_PROVINCE },
        showCapital() { return this.$store.getters.SHOW_CAPITAL },
        showTown() { return this.$store.getters.SHOW_TOWN }
    },
    methods: {
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
            const description = [];

            this.buttonList[name].description.forEach((value) => {
                description.push({
                    name: value.name,
                    type: "small-icon",
                    description: this.$store.getters.CHARACTERS(this.$route.params.project, value.tag),
                    isHideName: value.isHideName === true ? true : false
                });
            });

            this.$store.dispatch("OPEN_OBJECT", {
                name: this.buttonList[name].title,
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
        <UIButton v-for="(value, name) in buttonList" :key="name" :click-method="showPanel" :button-name="name">
            <component :is="value.icon" />
        </UIButton>

        <!-- Return button -->
        <RouterLink :to="{ name: 'home' }" class="left-button return-menu-button">
            ◄
        </RouterLink>
    </div>
</template>