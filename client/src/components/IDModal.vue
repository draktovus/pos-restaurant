<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { getShowIDModal, ofAge, showModal, checkAge, birthday } from '@/models/cart'
import type { Product } from '@/models/products'
import { computed } from '@vue/reactivity'

const maxDate = computed(() => {
  const currentDate = new Date()
  const year = currentDate.getFullYear() + 1
  const month =
    currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1
  const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate()
  return `${year}-${month}-${day}`
})

function IDRequired() {
  return getShowIDModal()
}

watch([IDRequired], ([IDReq]) => {
  if (IDReq) {
    showModal.value = true
  }
})

const emit = defineEmits(['canBuy'])

function isOver21(birthday: string) {
  const age = computed(() => {
    const date = new Date(birthday)
    const now = new Date()

    let timeDiff = now.getTime() - date.getTime()
    if (timeDiff < 0) {
      // if birthday is in the future
      date.setFullYear(now.getFullYear()) // set the year to current year
      timeDiff = now.getTime() - date.getTime() // recalculate time difference
    }

    const age = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25))
    return age
  })
  if (age.value >= 21) {
    ofAge.value = true
  } else {
    ofAge.value = false
  }
  checkAge()
  emit('canBuy', ofAge.value)
}
</script>

<template>
  <div>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Product Requires Identification</h1>
          <div class="field">
            <label class="label">Enter Your Birthday</label>
            <div class="control">
              <input class="input" type="date" v-model="birthday" :max="maxDate" />
            </div>
          </div>
          <button class="button is-success" @click="isOver21(birthday)">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delete {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
}
</style>
