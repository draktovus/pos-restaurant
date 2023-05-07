<script setup lang="ts">
import { ref } from 'vue'
import { type Users , createUser, getUsersLength, getUsers } from '@/models/users'
import { addMessage } from '@/models/session'
import router from '@/router'

const user = ref<Users>({
} as Users)

let error = ref(false)

function save() {
    createUser(user.value).then((response) => {
      console.log("THIS IS THE RESPOSNE FOR CREATING NEW USER:", response)
      addMessage(`Sucessfully created a new user: ${response.data.username}`, 'success')
      router.push('/admin/users')
      error.value = false
    }).catch((err) => {
      error.value = true
      addMessage(`Error! There was a problem and could not create a new user. ${err.data}`, 'danger')
    })
  }
  
function cancel(){
  addMessage("Canceled user", 'info')
  router.push('/admin/users')
}
</script>

<template>
  <form
    @submit.prevent
    class="add-user"
  >
    <h1 class="title has-text-light">Add New User</h1>
    <div class="field">
      <label class="label has-text-light">First Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="First Name" v-model="user.firstName" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Last Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Last Name" v-model="user.lastName" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Username</label>
      <div class="control">
        <input class="input" type="text" placeholder="Username" v-model="user.username" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="Password" v-model="user.password" />
      </div>
    </div>

    <p class="admin-status has-text-light">Admin Status</p>

    <div class="control has-text-light">
      <label class="radio has-text-light">
        <input type="radio" name="answer" value="true" v-model="user.isAdmin" />
        true
      </label>
      <label class="radio has-text-light">
        <input type="radio" name="answer" value="false" v-model="user.isAdmin" checked />
        false
      </label>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link is-primary" @click="save()">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-danger" @click="cancel()">Cancel</button>
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
