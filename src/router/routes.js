const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/login/LoginPage.vue') },
      { path: 'confirmation', component: () => import('src/pages/confirmation/ConfirmationPage.vue') },
      { path: 'teste', component: () => import('src/pages/pagesTestes/redirectComponentPage.vue') },
      { path: 'comfirmationAutomaticPage', component: () => import('src/pages/pagesTestes/ComfirmationAutomaticPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
