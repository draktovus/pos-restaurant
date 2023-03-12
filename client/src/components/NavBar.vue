<script setup lang="ts">
import { ref } from 'vue';
import { getProducts, type Product } from '../models/products'
import { quantity } from '../models/cart';
import { RouterLink } from 'vue-router'
const categories = ["Breakfast", "Lunch", "Dinner", "Sides", "Drinks"]
const currentTab = ref(categories[0])
</script>
<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink class="button is-light" to="/admin">
              <strong>Admin</strong>
            </RouterLink>
            <RouterLink class="button is-light" to="/login">
              <strong>Login</strong>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="tabs mb-0 is-toggle">
        <ul>
          <li v-for="category in categories" :class="{'is-active':currentTab==category}" @click="currentTab=category">
            <RouterLink class="is-light" to="/">
              {{category}}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
                  <RouterLink class="button is-light" to="/cart">
                    <span class="icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="tag is-danger tag is-rounded quantity-tag">{{ quantity }}</span>
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

</style>