import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import SailpunkEastMap from "@/pages/SailpunkEastMap.vue";
import EndlessEmpireMap from "@/pages/EndlessEmpireMap.vue";
import MinskMetro from "@/pages/MinskMetro.vue";
import ArgalForest from "@/pages/ArgalForest.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomePage
  },
  {
    name: "sailpunk-eastmap",
    path: "/sailpunk/eastMap",
    component: SailpunkEastMap
  },
  {
    name: "endless-empire",
    path: "/endlessEmpire/worldMap",
    component: EndlessEmpireMap
  },
  {
    name: "minsk-metro",
    path: "/minskMetro",
    component: MinskMetro
  },
  {
    name: "argal-forest",
    path: "/argalForest",
    component: ArgalForest
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
