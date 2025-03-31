import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import SailpunkEastMap from "@/pages/SailpunkEastMap.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
