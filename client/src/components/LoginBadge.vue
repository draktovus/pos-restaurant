<script setup lang="ts">
import { useSession, useLogout } from '@/models/session'

const session = useSession()
const logout = useLogout()
</script>

<template>
  <div class="navbar-item">
    <div class="buttons">
      <RouterLink to="/login" class="button is-light" v-if="!session.user">
        <strong>Login</strong>
      </RouterLink>
      <div  v-if="session.user">
        <a>
          <strong class="sessionUser">Logged in as: {{ session.user.username }}</strong>
        </a>
        <a class="button is-light" @click="logout()">
          <strong>Logout</strong>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sessionUser{
  vertical-align: middle;
  padding: 1rem;
  align-items: center;
  color: white;
}
</style>
