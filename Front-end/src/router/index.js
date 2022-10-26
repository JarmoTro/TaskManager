import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '../views/landingPage.vue'
import authPage from '../views/authPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: landingPage
    },
    {
      path: '/login',
      name: 'login',
      component: authPage
    },
    {
      path: '/register',
      name: 'register',
      component: authPage
    },
  ]
})

export default router
