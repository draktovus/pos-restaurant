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
  <nav class="navbar has-background-grey-darker" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <LoginBadge />

        <div class="navbar-item has-dropdown is-hoverable">
          <!-- v-if="session.user && session.user.isAdmin"> -->
          <a class="navbar-link has-text-light has-background-grey-darker is-arrowless">Admin</a>
          <div class="navbar-dropdown">
            <RouterLink class="navbar-item" to="/admin/products"> Products </RouterLink>
            <hr class="navbar-divider" />
            <RouterLink class="navbar-item" to="/admin/users"> Users </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-center">
        <div class="navbar-item is-flex-grow-1">
          <div class="buttons has-addons is-centered">
            <template v-for="category in categories">
              <RouterLink
                to="/"
                class="button is-light is-outlined"
                :class="{ 'is-info is-selected': currentTab == category }"
                @click="currentTab = category"
                >{{ category }}</RouterLink
              >
            </template>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <RouterLink class="navbar-item button is-outlined is-light" to="/readers">
            Readers
          </RouterLink>
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
