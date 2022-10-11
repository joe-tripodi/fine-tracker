import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "root",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/club-fines",
    name: "club-fines",
    component: () => import("../views/ClubFines.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routes };
export default router;
