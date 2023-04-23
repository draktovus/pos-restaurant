import LoginVue from '@/components/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import POSView from '@/views/POSView.vue'
import AdminVue from '@/views/Admin.vue'
<<<<<<< HEAD
import AddUserVue from '@/views/admin/AddUser.vue'
=======
import ProductsVue from '@/views/Products.vue'
>>>>>>> a4f69cf415331f1051607936f68ec314d23b71ee

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
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/admin/ProductsList.vue')
    },
    {
      path: '/admin/products/edit/:id?',
      name: 'admin-products-edit',
      component: () => import('../views/admin/ProductEdit.vue')
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminVue
    },
    {
      path: '/admin/users/edit/:id?',
      name: 'admin-users-edit',
      component: () => import('../views/admin/UserEdit.vue')
    },
    {
<<<<<<< HEAD
      path: '/admin/users/addUser',
      name: 'admin-users-add',
      component: AddUserVue
    },
=======
      path: '/readers',
      name: 'readers',
      component: () => import('../views/Readers.vue')
    }
>>>>>>> a4f69cf415331f1051607936f68ec314d23b71ee
  ]
})

export default router
