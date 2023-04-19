<script setup lang="ts">
import { getUsers, type User } from '@/models/users'
import { ref } from 'vue'
import { confirm } from '@/models/generalModals'

const users = ref<User[]>([])

getUsers().then((data) => {
  users.value = data.data
})

function deleteUser(_id: string) {
  confirm('Are you sure you want to delete this?', 'Question')
    .then(() => {
      console.log('delete: ' + _id)
    })
    .catch(() => {
      console.log('didn\'t do it to: ' + _id)
    })
}
</script>

<template>
    <h1 class="title">Users</h1>
    <router-link to="/admin/users/edit" class="button is-primary add-user">
      <div class="icon">
          <i class="fas fa-plus"></i>
      </div>
      <span>Add User</span>
    </router-link>

    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th></th>
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
          <td></td>
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.isAdmin }}</td>
          <td>
            <button class="button is-primary">Edit</button>
            <button class="button is-danger" @click="deleteUser(user._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<style scoped>
  .add-user{
    float: right;
    margin-bottom: 1rem;
  }
</style>
