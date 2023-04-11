<script setup lang="ts">
import { getUsers } from '@/models/users'
import { ref } from 'vue'

const users = ref(getUsers())
</script>

<template>
  <div class="container">
    <div class="columns is-centered">
      <button class="button is-primary">Add User</button>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Admin Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.password }}</td>
            <td>{{ user.admin }}</td>
            <td>
              <button class="button is-primary">Edit</button>
              <button class="button is-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
