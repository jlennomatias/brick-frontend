import { route } from "quasar/wrappers";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { checkAuthToken } from "src/services/auth/authService";

export default route(function (/* { store, ssrContext } */) {
  const router = createRouter({
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  const isAuthenticated = () => {
    return !!localStorage.getItem("authToken");
  };

  router.beforeEach((to, from, next) => {
    if (["/", "/login"].includes(to.path) && isAuthenticated()) {
      next("/consentsManagerPage");
    } else if (!isAuthenticated() && to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  });

  return router;
});
