import LoginVue from '@/components/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import POSView from '@/views/POSView.vue'
import AdminVue from '@/views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: POSView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../components/Cart.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminVue
    }
  ]
})

export default router
