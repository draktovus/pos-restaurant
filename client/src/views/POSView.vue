<script setup lang="ts">
import { addMessage } from '@/models/session'
import ProductsVue from '../components/Products.vue'
import Cart from '@/components/Cart.vue'
import { removeFromCart, resetEditQuantity, total, removeAll } from '@/models/cart'
import { transaction_state, payCard } from '@/models/stripe'
import { inject, ref } from 'vue'
import { toFixed } from '../models/utilities'
import { toggleOff} from '@/models/searchbar'


const { notificationsIsActive, updateNotification } = inject<any>('notifications')

const cashModal = ref(false)
const remainingTotal = ref(0)
const cash = ref()
const change = ref()
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Sides', 'Drinks', 'Requires ID']

function payCash() {
  if (total.value > 0) {
    console.log('Paying with cash')
    cashModal.value = !cashModal.value
  } else {
    console.log('Total is 0, no payment needed.')
  }
}

function checkCash(cash: number) {
  remainingTotal.value = total.value
  change.value = cash - remainingTotal.value
  change.value = toFixed(change.value, 2)
  remainingTotal.value = remainingTotal.value - cash
  console.log('Checking cash: ' + cash)
  console.log('Total is: ' + remainingTotal.value)

  if (remainingTotal.value < 0) {
    console.log('Cash is greater than total')
    addMessage(
      'Cash is greater than total. Cash received: ' + cash + ', change is ' + change.value + '.',
      'info'
    )
  } else if (remainingTotal.value > 0) {
    console.log('Cash is less than remaining total')
    addMessage(
      'Cash is less than remaining total. Cash received: ' +
        cash +
        ', remaining total is ' +
        remainingTotal.value +
        '.',
      'danger'
    )
  } else {
    console.log('Cash is equal to remaining total')
    addMessage('Cash is equal to remaining total, no change needed', 'success')
  }
  payCash()
}

function newCustomer() {
  cash.value = 0
  change.value = 0
  //remove all products from cart
  removeAll()
  //reset edit quantity
  resetEditQuantity()
  //reset filters
  toggleOff()
}
</script>

<template>
  <div class="columns">
    <div class="column is-8">
      <ProductsVue />
    </div>
    <div class="column">
      <div class="container max-height has-background-grey-darker box">
        <Cart />
      </div>
      <div class="container">
        <div class="field is-grouped">
          <div class="control is-expanded">
            <button class="button is-success is-fullwidth" @click="payCash">Pay Cash</button>
          </div>
          <div>
            <div class="modal" :class="{ 'is-active': cashModal }">
              <div class="modal-background"></div>
              <div class="modal-content">
                <div class="box">
                  <h1 class="title">Cash Payment</h1>
                  <div class="field">
                    <label class="label">Cash Received:</label>
                    <div class="control has-icons-left">
                      <input
                        class="input"
                        v-model="cash"
                        type="number"
                        placeholder="Cash Received"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-dollar-sign"></i>
                      </span>
                    </div>
                  </div>
                  <button class="button is-success" @click="checkCash(cash)">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          <div class="control is-expanded">
            <button
              class="button is-info is-fullwidth"
              @click="payCard(total)"
              :class="{ 'is-loading': transaction_state == 'loading' }"
            >
              Pay Card
            </button>
          </div>
        </div>
        <div class="container">
          <div class="field is-grouped">
            <div class="control is-expanded">
              <button
                class="button is-dark is-fullwidth is-rounded"
                @click="updateNotification(!notificationsIsActive)"
              >
                Toggle notifications
              </button>
            </div>
            <div class="control is-expanded">
              <button
                class="button is-dark is-fullwidth is-rounded"
                @click="newCustomer()"
              >
                New Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.max-height {
  height: calc(100vh - 35vh);
  overflow-y: scroll;
}
</style>
