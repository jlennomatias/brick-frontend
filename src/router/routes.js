const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "login",
        component: () => import("src/pages/login/LoginPage.vue"),
      },
      {
        path: "confirmation",
        component: () => import("src/pages/confirmation/ConfirmationPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "consentsManagerPage",
        component: () => import("src/pages/consents/consentsManagerPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "teste",
        component: () =>
          import("src/pages/pagesTestes/redirectComponentPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
