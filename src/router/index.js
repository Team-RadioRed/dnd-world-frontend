import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import MapPage from "@/pages/MapPage.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomePage,
  },
  {
    name: "map",
    path: "/map/:project",
    component: MapPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
