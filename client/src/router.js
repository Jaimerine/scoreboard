import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/boards",
      name: "boards",
      component: () => import("./components/ScoreBoards.vue"),
    },
    {
      path: "/board/:id",
      name: "board",
      props: true,
      component: () => import("./components/ScoreBoard.vue"),
    },
    {
      path: "/board/:id/player/:playerid",
      name: "player",
      props: true,
      component: () => import("./components/ScoreBoard.vue"),
    },
  ],
});

export default router;
