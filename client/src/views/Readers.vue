<script setup lang="ts">
import { getLocations, getReaders, type StripeLocation, type StripeReader, updateReader } from '@/models/stripe'
import { ref } from 'vue'
import { useSession, api, addMessage } from '@/models/session'
const session = useSession()

const locationsList = ref<StripeLocation[]>([])
const readersList = ref<StripeReader[]>([])

const locationId = ref('none')
const readerId = ref('none')

getLocations().then((res) => {
  locationsList.value = res.data
  const currentLocation = res.data.find((ele) => {
    const u = session.user ? session.user.stripe_data.stripe_location_id : ''
    return ele.id == u
  })
  locationId.value = currentLocation ? currentLocation.id : 'none'
})
getReaders().then((res) => {
  readersList.value = res.data
  const currentReader = res.data.find((ele) => {
    const u = session.user ? session.user.stripe_data.stripe_reader_id : ''
    return ele.id == u
  })
  readerId.value = currentReader ? currentReader.id : 'none'
  console.log(readerId.value)
})

// will tell the server to update the user's reader, user must be logged in.
async function changeReader() {
  updateReader(readerId.value, locationId.value).then((res) => {
    console.log(res)
    if (session.user) {
      session.user.stripe_data = res.data.stripe_data
      addMessage("Updated reader to " + readerId.value + ". Updated location to " + locationId.value, 'success')
    }
    else {
      addMessage("No user is logged in to change reader!", 'danger')
    }
  })
}
</script>

<template>
  <div class="fields" v-if="session.user">
    <div class="field has-text-light">
      <label class="label has-text-light">Select Location: </label>
      <div class="field is-grouped">
        <div class="control">
          <div class="select">
            <select v-model="locationId">
              <option value="none" disabled>Select a reader</option>
              <option v-for="location in locationsList" :value="location.id">
                {{ location.display_name }} ({{ location.id }})
              </option>
            </select>
          </div>
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
  </div>

  <div class="content has-text-light has-text-centered" v-else>
    <h1 class="title has-text-light">Must be logged in.</h1>
    Please login.
  </div>
</template>

<style scoped></style>
