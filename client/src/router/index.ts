import LoginVue from '@/components/Login.vue'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import POSView from '@/views/POSView.vue'
import AdminVue from '@/views/Admin.vue'
import AddUserVue from '@/views/admin/AddUser.vue'
import ProductsVue from '@/views/Products.vue'
import { useSession } from '@/models/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: POSView,
      beforeEnter: secureRoute
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
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/admin/ProductsList.vue'),
      beforeEnter: secureRoute
    },
    {
      path: '/admin/products/edit/:id?',
      name: 'admin-products-edit',
      component: () => import('../views/admin/ProductEdit.vue'),
      beforeEnter: secureRoute
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminVue,
      beforeEnter: secureRoute
    },
    {
      path: '/admin/users/edit/:id?',
      name: 'admin-users-edit',
      component: () => import('../views/admin/UserEdit.vue'),
      beforeEnter: secureRoute
    },
    {
      path: '/admin/users/addUser',
      name: 'admin-users-add',
      component: AddUserVue,
      beforeEnter: secureRoute
    },
    {
      path: '/readers',
      name: 'readers',
      component: () => import('../views/Readers.vue'),
      beforeEnter: secureRoute
    }
  ]
})

function secureRoute(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const session = useSession()
  if (session.user) {
    next()
  } else {
    if (!session.redirectUrl && to.path != '/login') {
      session.redirectUrl = to.fullPath
    }
    next('/login')
  }
}

export default router
