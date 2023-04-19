import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import FireSpreadView from "../views/FireSpreadView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "FireSpread",
    component: FireSpreadView,
  },
  {
    path: "/:catchAll(.*)*",
    component: FireSpreadView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
