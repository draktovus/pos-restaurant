<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LoginBadge from './LoginBadge.vue'
import { useSession } from '@/models/session'
const session = useSession()
</script>
<template>
  <nav class="navbar has-background-grey-darker" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink class="button is-light" to="/">
              <strong>Home</strong>
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <RouterLink class="navbar-item button is-outlined is-light" to="/readers">
            Readers
          </RouterLink>
          <LoginBadge />
          <div class="navbar-item has-dropdown is-hoverable">
            <a v-if="session.user?.isAdmin" class="navbar-link button is-light is-arrowless">
              Admin
            </a>
            <div class="navbar-dropdown">
              <RouterLink class="navbar-item" to="/admin/products"> Products </RouterLink>
              <RouterLink class="navbar-item" to="/admin/users"> Users </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <slot name="notifications"> </slot>
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
