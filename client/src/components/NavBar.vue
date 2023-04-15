<script setup lang="ts">
import { ref } from 'vue'
import { getProducts, type Product } from '../models/products'
import { quantity } from '../models/cart'
import { RouterLink } from 'vue-router'
import { useSession } from '../models/session'
import LoginBadge from './LoginBadge.vue'

const session = useSession()
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Sides', 'Drinks']
const currentTab = ref(categories[0])
</script>
<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <LoginBadge />
        
        <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href="">
                Admin
              </a>
              <div class="navbar-dropdown">
                <RouterLink class="navbar-item" to="/admin/products" v-if="session.user?.isAdmin == true">
                  Products
                </RouterLink>
                <RouterLink class="navbar-item" to="/admin/users" v-if="session.user?.isAdmin == true">
                  Users
                </RouterLink>
                
              </div>
            </div>
      </div>
      
      <div class="navbar-center">
        <div class="navbar-item is-flex-grow-1">
          <div class="tabs mb-0 is-toggle">
            <ul>
              <li
                v-for="category in categories"
                :class="{ 'is-active': currentTab == category }"
                @click="currentTab = category"
              >
                <RouterLink class="is-light" to="/">
                  {{ category }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <RouterLink class="button is-light" to="/cart">
            <span class="icon">
              <i class="fas fa-shopping-cart"></i>
              <span class="tag is-danger is-rounded quantity-tag">{{ quantity }}</span>
            </span>
          </RouterLink>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-danger">
              <strong>Checkout</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.tabs li a {
  color: white;
}
.quantity-tag {
  position: absolute;
  top: -5px;
  right: -5px;
  border-radius: 1rem;
}
</style>
