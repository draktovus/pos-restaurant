<script setup lang="ts">
import { getUsers, deleteUser, type Users } from '@/models/users'
import { ref } from 'vue'
import GenModals from '@/components/GeneralModals.vue'
import { closeModal, confirm } from '@/models/generalModals'
import { RouterLink } from 'vue-router'
import { addMessage, useSession } from '@/models/session'

const users = ref<Users[]>([])

getUsers().then((data) => {
  users.value = data.data
})

function deleteUserFunc(id: string) {
  confirm('Are you sure you want remove this user?', 'Delete User')
    .then(() => {
      console.log('DELETING USER: ' + id)
      deleteUser(id).then((res)=>{
        const index = users.value.findIndex(u => u._id === id)
        users.value.splice(index, 1)
        addMessage(`Deleted user with id: ${id}`, 'success')
      })
      closeModal()
    })
    .catch(() => {
      console.log("didn't do it to: " + id)
    })
}
</script>

<template>
  <gen-modals></gen-modals>
  
  <RouterLink to="/admin/users/addUser" class="button is-primary add-user">
    <div class="icon">
      <i class="fas fa-plus"></i>
    </div>
    <span>Add User</span>
  </RouterLink>

  <h1 class="title has-text-light">Users</h1>

  <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>Password</th>
        <th>Admin Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user._id }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.password }}</td>
        <td>{{ user.isAdmin }}</td>
        <td>
          <router-link :to="'/admin/users/edit/' + user._id" class="button">
              <div class="icon">
                <i class="fas fa-edit"></i>
              </div>
            </router-link>
            <button class="button" @click="deleteUserFunc(user._id)">
              <div class="icon">
                <i class="fas fa-trash"></i>
              </div>
            </button>
        </td>
      </tr>
    </tbody>
  </table>
  
</template>

<style scoped>
.add-user {
  float: right;
  margin-bottom: 1rem;
}
</style>
