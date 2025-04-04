import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import SailpunkEastMap from "@/pages/SailpunkEastMap.vue";
import CharacterList from "@/pages/CharacterList.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomePage,
  },
  {
    name: "sailpunk-eastmap",
    path: "/sailpunk/eastMap",
    component: SailpunkEastMap,
  },
  {
    name: "character-list",
    path: "/character/:isWanderer",
    component: CharacterList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
