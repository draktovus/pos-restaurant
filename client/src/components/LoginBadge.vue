<script setup lang="ts">
import { useSession, useLogout } from '@/models/session';

const session = useSession();
const logout = useLogout();
</script>

<template>
    <div class="navbar-item">
        <div class = "buttons">
            <RouterLink to="/login" class="button is-light" v-if="!session.user">
                <strong>Login</strong>
            </RouterLink>
            <div v-else>
                <a>
                    #<strong>{{session.user.id}}</strong>
                </a>
                <a class="button is-light" @click="logout()">
                    <strong>Logout</strong>
                </a>
            </div>
            <RouterLink class="button is-light" to="/admin">
                  <strong>Admin</strong>
                </RouterLink>
        </div>
    </div>
</template>



<style scoped>

</style>