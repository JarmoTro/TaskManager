import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '../views/landingPage.vue'
import authPage from '../views/authPage.vue'
import welcomePage from '../views/welcomePage.vue'
import userPage from '../views/userPage.vue'
import createTaskPage from '../views/createTaskPage.vue'
import notFound from '../views/notFoundPage.vue'


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
    {
      path: '/welcome',
      name: 'welcome',
      component: welcomePage
    },
    {
      path: '/myTasks',
      name: 'userPage',
      component: userPage
    },
    {
      path: '/createTask',
      name: 'createTaskPage',
      component: createTaskPage
    },
    { path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: notFound 
    },
  ]
})

export default router
