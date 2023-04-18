<script setup lang="ts">
import { ref } from 'vue';
import { api, useLogin, useSession } from '../models/session'
import router from '@/router';

const session = useSession();
const error = ref(false);
const username = ref('');
const password = ref('');
const login = useLogin()

async function loginUser() {
  const response = await api('users/login', {
    "username": username.value,
    "password": password.value
  }, 'POST');
  if(response != undefined){
    session.redirectUrl = '/'
    login(response.data)
  }
};

</script>
<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="box">
          <h1 class="title">Login</h1>
          <form @submit.prevent="loginUser">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input v-model="username" class="input" type="text" placeholder="Username" />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input v-model="password" class="input" type="password" placeholder="Password" />
              </div>
            </div>
            <div class="field">
              <button type="submit" class="button is-primary" >Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
