import { route } from "quasar/wrappers";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

export default route(function (/* { store, ssrContext } */) {
  const router = createRouter({
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });

  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };

  // Adiciona a guarda de rota global
  router.beforeEach((to, from, next) => {
    if (["/", "/login"].includes(to.path) && isAuthenticated()) {
      next("/confirmation"); // Redireciona para /confirmation se o usuário estiver autenticado e acessar '/' ou '/login'
    } else if (!isAuthenticated() && to.path !== "/login") {
      next("/login"); // Redireciona para /login se o usuário não estiver autenticado e tentar acessar qualquer rota protegida
    } else {
      next(); // Permite a navegação para outras rotas
    }
  });

  return router;
});
