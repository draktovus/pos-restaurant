<script setup lang="ts">
import { ref } from 'vue'
import { getProducts, type Product } from '../models/products'
import { quantity } from '../models/cart'
import { RouterLink } from 'vue-router'
import { useSession } from '../models/session'
import LoginBadge from './LoginBadge.vue'

const session = useSession();
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Sides', 'Drinks']
const currentTab = ref(categories[0])
const searchQuery = ref('')
</script>
<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <LoginBadge />
      </div>
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
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input is-rounded"
                type="text"
                v-model="searchQuery"
                placeholder="Search..."
              />
            </div>
            <div class="control">
              <button class="button is-info" @click="search">Search</button>
            </div>
          </div>
        </div>
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
.tabs li a{
  color: white;
}
</style>

<script lang="ts">
export default {
    methods: {
        search: () => {
            console.log(`Searching for ${searchQuery.value}`);
        }
    },
}
</script>
