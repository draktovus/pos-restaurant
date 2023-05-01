<script setup lang="ts">
import { editUser , getUser, type Users } from '@/models/users'
import router from '@/router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref<Users>({} as Users)
getUser(route.params.id as string).then((data) => {
  user.value = data.data ?? ({} as Users)
})

const firstName = ref('')
const lastName = ref('')
const id = ref(0)
const isAdmin = ref(false)
const password = ref('')

function editInfo(id: number, firstName: string, lastName: string, password: string, isAdmin: boolean) {
  editUser(id, firstName, lastName, password, isAdmin, route.params.id as string).then((data) => {
    if (data) {
      router.push('/admin/users')
      console.log('success')
    }
  })
}

</script>

<template>
  <div>
    <form @submit.prevent="editInfo(id, firstName, lastName, password, isAdmin)">
      <div class="field">
        <label class="label">Id</label>
        <div class="control">
          <input class="input" type="text" :placeholder="user.id ? user.id.toString() : ''" v-model="id">
        </div>
      </div>

      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" :placeholder=user.firstName v-model="firstName">
        </div>
      </div>

      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" :placeholder=user.lastName v-model="lastName">
        </div>
      </div>

      <div calss="field">
        <label class="label">
          Username
          <input class="input" type="text" :placeholder=user.username  disabled>
        </label>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" :placeholder=user.password v-model="password">
        </div>
      </div>

      <div class="control">
      <label class="radio">
        <input type="radio" name="answer" value="true" v-model="isAdmin" />
        true
      </label>
      <label class="radio">
        <input type="radio" name="answer" value="false" v-model="isAdmin" />
        false
      </label>
    </div>

      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit">Submit</button>
        </div>
      </div>

    </form>
  </div>
</template>

<style scoped></style>
