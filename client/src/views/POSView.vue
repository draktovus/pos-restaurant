<script setup lang="ts">
import { addMessage, api, useSession } from '@/models/session'
import ProductsVue from '../components/Products.vue'
import Cart from '@/components/Cart.vue'
import { total } from '@/models/cart'
import { amount } from '@/models/stripe'
import { ref } from 'vue'

const messages = ref<String[]>([])

const session = useSession()
function payCash() {
  console.log('Paying with cash')
}

const transaction_state = ref('none')
function payCard() {
  if (session.user) {
    console.log('Paying with card')
    transaction_state.value = 'loading'
    const amt = Math.floor(total.value * 100)
    console.log('Amount is' + amt)
    api(
      'stripe/readers/process-payment',
      {
        amount: amt,
        stripe_reader_id: session.user.stripe_data.stripe_reader_id
      },
      'POST'
    ).then((response) => {
      console.log(response)
    })
    messages.value.push(
      `Processing payment of ${amt} for reader ${session.user.stripe_data.stripe_reader_id}`
    )
  }
}

function simulatePayment() {
  if (session.user) {
    console.log('Simulating payment')
    api(
      'stripe/readers/simulate-payment',
      { stripe_reader_id: session.user.stripe_data.stripe_reader_id },
      'POST'
    ).then((res) => {
      console.log(res)
      console.log('Capturing payment now.')
      api('stripe/capture-payment-intent', {
        payment_intent_id: res.data.action.process_payment_intent.payment_intent
      }).then((response) => {
        console.log(response)
        console.log('Payment has been captured. HECK YEAH.')
        transaction_state.value = 'none'
      })
    })
  }
}
</script>

<template>
  <div class="notifications box">
    <template v-for="(msg, i) in messages">
      <div class="notification is-info">
        <p class="content">
          {{ msg }}
        </p>
        <button class="delete" @click="messages.splice(i, 1)"></button>
        <button class="button" @click="simulatePayment">Simulate payment</button>
      </div>
    </template>
    <div class="message"></div>
  </div>
  <div class="columns">
    <div class="column is-8">
      <ProductsVue />
    </div>
    <!-- <div class="column is-1">
      Additional Options/Buttons go here
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-parent">
           //Add content or other tiles 
            <div class="tile is-child button">Discount</div>
            <div class="tile is-child button">Tax Exempt</div>
          </div>
        </div>
      </div> -->
    <div class="column">
      <div class="container max-height has-background-grey-darker box">
        <Cart />
      </div>
      <div class="container">
        <div class="field is-grouped">
          <div class="control is-expanded">
            <button class="button is-success is-fullwidth" @click="payCash">Pay Cash</button>
          </div>
          <div class="control is-expanded">
            <button
              class="button is-info is-fullwidth"
              @click="payCard"
              :class="{ 'is-loading': transaction_state == 'loading' }"
            >
              Pay Card
            </button>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control is-expanded">
            <button class="button is-dark is-fullwidth is-rounded">Save for later</button>
          </div>
          <div class="control is-expanded">
            <button class="button is-danger is-fullwidth is-rounded">Delete</button>
          </div>
          <div class="control is-expanded">
            <button class="button is-dark is-fullwidth is-rounded">Undo</button>
          </div>
          <div class="control is-expanded">
            <button class="button is-dark is-fullwidth is-rounded">Redo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.max-height {
  height: calc(100vh - 28vh);
  overflow-y: scroll;
}
</style>
