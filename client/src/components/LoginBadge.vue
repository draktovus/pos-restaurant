<script setup lang="ts">
import { useSession, useLogout } from '@/models/session'

const session = useSession()
const logout = useLogout()
</script>

<template>
  <div class="navbar-item" v-if="!session.user">
    <RouterLink to="/login" class="button is-dark is-inverted is-outlined" v-if="!session.user">
      <strong>Login</strong>
    </RouterLink>
  </div>

  <div class="navbar-item" v-else>
    <div class="buttons">
      <button class="button is-dark is-inverted is-outlined">
        <strong>{{ session.user.username }}</strong>
      </button>
      <button class="button is-dark is-inverted is-outlined" @click="logout">
        <strong>Logout</strong>
      </button>
    </div>
  </div>
</template>

<style scoped>
.sessionUser {
  vertical-align: middle;
  padding: 1rem;
  align-items: center;
  color: white;
}
</style>
