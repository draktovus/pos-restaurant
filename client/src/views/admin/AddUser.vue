<script setup lang="ts">
import { ref } from 'vue'
<<<<<<< HEAD
import { createUser, getUsers } from '@/models/users'
=======
import { createUser, getUsersLength, getUsers } from '@/models/users'
import { addMessage } from '@/models/session'
>>>>>>> d1ee8042b5f5db7cce12c40f25f94ff34dfc85a0
import router from '@/router'

async function getId() {
  await getUsers().then((data) => {
    return (id.value = data.data.length + 1)
  })
}

let id = ref(0)
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const isAdmin = ref(false)

let error = ref(false)

function createUserFunc(
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  isAdmin: boolean
) {
  getId().then(() => {
    createUser(id.value, firstName, lastName, username, password, isAdmin).then((response) => {
        if (response) {
          console.log("THIS IS THE RESPOSNE FOR CREATING NEW USER:", response)
          addMessage(`Sucessfully created a new user: ${response.data.username}`, 'success')
          router.push('/admin/users')
          error.value = false
        } else {
          error.value = true
          addMessage(`Error! There was a problem and could not create a new user. ${response.data}`, 'danger')
        }
      }
    )
  })
}
</script>

<template>
  <form
    @submit.prevent="createUserFunc(firstName, lastName, username, password, isAdmin)"
    class="add-user"
  >
    <h1 class="title has-text-light">Add New User</h1>
    <div class="field">
      <label class="label has-text-light">First Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="First Name" v-model="firstName" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Last Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Last Name" v-model="lastName" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Username</label>
      <div class="control">
        <input class="input" type="text" placeholder="Username" v-model="username" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="Password" v-model="password" />
      </div>
    </div>

    <p class="admin-status has-text-light">Admin Status</p>

    <div class="control has-text-light">
      <label class="radio has-text-light">
        <input type="radio" name="answer" value="true" v-model="isAdmin" />
        true
      </label>
      <label class="radio has-text-light">
        <input type="radio" name="answer" value="false" v-model="isAdmin" checked />
        false
      </label>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link is-primary">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-danger">Cancel</button>
      </div>
    </div>
  </form>
  <p class="help is-danger" v-if="error">User already exists</p>
</template>

<style scoped>
.radio {
  color: #FFFFFF;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}
.admin-status {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.125;
}
.help {
  text-shadow: 1px 1px 2px, 0 0 1em darkred;
  margin-top: 2rem;
  text-align: center;
  font-size: 18px;
  animation: fade 1.5s infinite;
  -webkit-animation: fade 1.5s infinite;
}
@keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
