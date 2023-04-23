<script setup lang="ts">
import { getUsers, deleteUser, type Users } from '@/models/users'
import { ref } from 'vue'
import GenModals from '@/components/GeneralModals.vue'
import { closeModal, confirm } from '@/models/generalModals'
import { RouterLink } from 'vue-router'
import { useSession } from '@/models/session'

const users = ref<Users[]>([])
const session = useSession()

getUsers().then((data) => {
  users.value = data.data
})

function deleteUserFunc(id: number) {
  confirm("Are you sure you want remove this user?", 'Delete User')
    .then(() => {
      deleteUser(id)
      console.log('delete: ' + id)
      closeModal()
      location.reload() 
    })
    .catch(() => {
      console.log('didn\'t do it to: ' + id)
    })
}
</script>

<template>
    <gen-modals></gen-modals>
    <h1 class="title">Users</h1>
      <div class="icon">
          <i class="fas fa-plus"></i>
      </div>
      <RouterLink to="/admin/users/addUser" class="button is-primary add-user">
        <div class="icon">
                <i class="fas fa-plus"></i>
        </div>
        <span>Add User</span>
      </RouterLink>

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
            <button class="button is-danger" @click="deleteUserFunc(user.id)">Delete</button>
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
