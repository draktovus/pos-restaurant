<script setup lang="ts">
import { addMessage } from '@/models/session'
import { editUser, getUser, type Users } from '@/models/users'
import router from '@/router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let error = ref(false)
const route = useRoute()
const user = ref<Users>({} as Users)
getUser(route.params.id as string).then((data) => {
  user.value = data.data ?? ({} as Users)
})

function save() {
  editUser(user.value)
    .then((response) => {
      console.log('THIS IS THE RESPOSNE FOR EDITING USER:', response)
      addMessage(`Sucessfully edited credentials for: ${response.data.username}`, 'success')
      router.push('/admin/users')
      error.value = false
    })
    .catch((err) => {
      error.value = true
      addMessage(`Error! There was a problem and could not edit user. ${err.data}`, 'danger')
    })
}

function cancel() {
  addMessage('Canceled user', 'info')
  router.push('/admin/users')
}
</script>

<template>
  <div>
    <form @submit.prevent>
      <div class="field">
        <label class="label has-text-light">Id</label>
        <div class="control">
          <input class="input" type="text" placeholder="ID" v-model="user._id" disabled />
        </div>
      </div>

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

      <div calss="field">
        <label class="label has-text-light">
          Username
          <input class="input" type="text" placeholder="Username" v-model="user.username" />
        </label>
      </div>

      <div class="field">
        <label class="label has-text-light">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Password" v-model="user.password" />
        </div>
      </div>

      <p class="admin-status has-text-light">Admin Status</p>

      <div class="control">
        <label class="radio">
          <input type="radio" name="answer" value="true" v-model="user.isAdmin" />
          true
        </label>
        <label class="radio">
          <input type="radio" name="answer" value="false" v-model="user.isAdmin" />
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
    <p class="help is-danger" v-if="error">Invalid credentials</p>
  </div>
</template>

<style scoped>
.radio {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: grey;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
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
