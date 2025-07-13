<script>
import IconTemple from "@/components/svg/IconTemple.vue";
import IconCompas from "@/components/svg/IconCompas.vue";
import IconTeam from "@/components/svg/IconTeam.vue";
import IconCrown from "@/components/svg/IconCrown.vue";
import IconTag from "@/components/svg/IconTag.vue";
import UIButton from "@/components/sailpunk/UIButton.vue";
import UIToggleFilter from "@/components/sailpunk/UIToggleFilter.vue";

export default {
    data() {
        return {
            isShow: false,
            filterList: [
                {
                    name: "Провинции",
                    mainColor: "#ff0000",
                    disableColor: "#b20000"
                },
                {
                    name: "Столицы",
                    mainColor: "#ff9100",
                    disableColor: "#b26500"
                },
                {
                    name: "Города",
                    mainColor: "#3A76EA",
                    disableColor: "#2852a3"
                }
            ]
        }
    },
    components: {
        IconCompas,
        IconTeam,
        IconTemple,
        IconCrown,
        IconTag,
        UIButton,
        UIToggleFilter
    },
    computed: {
        showProvince() { return this.$store.getters.SHOW_PROVINCE },
        showCapital() { return this.$store.getters.SHOW_CAPITAL },
        showTown() { return this.$store.getters.SHOW_TOWN }
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
        },
        showGods() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Боги",
                description: [{
                    name: "Пантеон",
                    type: "small-icon",
                    description: this.getCharacterData("pantheon")
                },
                {
                    name: "Малые боги",
                    type: "small-icon",
                    description: this.getCharacterData("smallGods")
                },
                {
                    name: "Забытые боги",
                    type: "small-icon",
                    description: this.getCharacterData("forgottenGods")
                },
                {
                    name: "Древние боги",
                    type: "small-icon",
                    description: this.getCharacterData("oldGods")
                }
                ]
            });
        },
        showPartners() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Персонажи напарники",
                description: [{
                    name: "Название",
                    type: "small-icon",
                    description: this.getCharacterData("partners"),
                    isHideName: true
                }]
            });
        },
        showWanderers() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Странствующие персонажи",
                description: [{
                    name: "Название",
                    type: "small-icon",
                    description: this.getCharacterData("wanderer"),
                    isHideName: true
                }]
            });
        },
        showEmpire() {
            this.$store.dispatch("OPEN_OBJECT", {
                name: "Персонажи из империи",
                description: [{
                    name: "Название",
                    type: "small-icon",
                    description: this.getCharacterData("empire"),
                    isHideName: true
                }]
            });
        },
        getCharacterData(name) {
            return this.$store.getters.CHARACTERS(name);
        },
        getState(name) {
            switch (name) {
                case "Провинции":
                    return this.showProvince;
                case "Столицы":
                    return this.showCapital;
                case "Города":
                    return this.showTown;
            }
        },
        getClickMethod(name) {
            switch (name) {
                case "Провинции":
                    return this.toggleProvince;
                case "Столицы":
                    return this.toggleCapital;
                case "Города":
                    return this.toggleTown;
            }
        }
    }
}
</script>


<template>
    <div v-if="isShow" class="sailpunk-filter-panel">
        <UIToggleFilter v-for="(filter, index) in filterList" :key="index" :state="getState(filter.name)"
            :data-object="filter" :click-method="getClickMethod(filter.name)" />
    </div>

    <div class="sailpunk-left-container">
        <UIButton :clickMethod="showGods">
            <IconTemple />
        </UIButton>
        <UIButton @click="showEmpire">
            <IconCrown />
        </UIButton>
        <UIButton @click="showPartners">
            <IconTeam />
        </UIButton>
        <UIButton @click="showWanderers">
            <IconCompas />
        </UIButton>
        <UIButton @click="toggleVisible">
            <IconTag />
        </UIButton>
    </div>
</template>