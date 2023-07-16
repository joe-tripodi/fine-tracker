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
    path: "/clubfines",
    name: "clubfines",
    component: () => import("../views/ClubFines.vue"),
  },
  {
    path: "/playerfines",
    name: "playerfines",
    component: () => import("../views/PlayerFines.vue"),
  },
  {
    path: "/statistics",
    name: "statistics",
    component: () => import("../views/FineStatistics.vue"),
  },
  {
    path: "/players",
    name: "players",
    component: () => import("../views/PlayersView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/finesbyplayer",
    name: "finesbyplayer",
    component: () => import("../views/FinesByPlayer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: "has-background-light",
});

export { routes };
export default router;
