import { createRouter, createWebHistory } from "vue-router";

import ShowsView from "../../ui/shows/shows.page.component.vue";
import ShowView from "../../ui/show/show.page.component.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shows",
      component: ShowsView,
    },
    {
      path: "/show/:id",
      name: "show",
      component: ShowView,
    },
    {
      path: "/:catchAll(.*)",
      redirect: () => {
        return "/";
      },
    },
  ],
});
