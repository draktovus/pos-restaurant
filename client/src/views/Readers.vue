<script setup lang="ts">
import { readersList, locationsList } from '@/models/stripe'
import { ref } from 'vue'
import { useSession } from '@/models/session'
import { api } from '@/models/fetch'
const session = useSession()
const locationId = ref(null)
const readerId = ref(null)
// will tell the server to update the user's reader, user must be logged in.
async function changeReader() {
  await api(
    'users/update/stripe-data',
    {
      ...session.user,
      stripe_data: {
        stripe_location_id: locationId.value,
        stripe_reader_id: readerId.value
      }
    },
    'PATCH'
  ).then((res) => {
    console.log(res)
    if (session.user) {
      session.user.stripe_data = res.data.stripe_data
    }
  })
}
async function changeLocation() {
  await api(
    'users/update/stripe-data',
    {
      ...session.user,
      stripe_data: {
        stripe_location_id: locationId.value,
        stripe_reader_id: readerId.value
      }
    },
    'PATCH'
  ).then((res) => {
    console.log(res)
    if (session.user) {
      session.user.stripe_data = res.data.stripe_data
    }
  })
}
</script>

<template>
  <div class="field has-text-light">
    <label class="label has-text-light">Select Location: </label>
    <div class="field is-grouped">
      <div class="control">
        <div class="select">
          <select v-model="locationId">
            <option value="none" selected disabled>Select a reader</option>
            <option v-for="location in locationsList" :value="location.id">
              {{ location.display_name }} ({{ location.id }})
            </option>
          </select>
        </div>
      </div>
      <div class="control">
        <button class="button" @click="changeLocation">Update location</button>
      </div>
    </div>
  </div>

  <div class="field has-text-light">
    <label class="label has-text-light">Select Reader: </label>
    <div class="field is-grouped">
      <div class="control">
        <div class="select">
          <select v-model="readerId">
            <option value="none" selected disabled>Select a reader</option>
            <option v-for="reader in readersList" :value="reader.id">
              {{ reader.label }} ({{ reader.id }})
            </option>
          </select>
        </div>
      </div>
      <div class="control">
        <button class="button" @click="changeReader">Update reader</button>
      </div>
    </div>
  </div>
  <div class="content has-text-light has-text-centered">
    <h1 class="title has-text-light">Must be logged in.</h1>
    Please login.
  </div>
</template>

<style scoped></style>
