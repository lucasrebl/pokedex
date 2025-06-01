import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon-details',
      component: () => import('../views/DetailPage.vue')
    }
  ]
})

export default router