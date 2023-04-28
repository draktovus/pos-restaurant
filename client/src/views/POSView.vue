<script setup lang="ts">
import { addMessage, api, deleteMessage, useSession } from '@/models/session'
import ProductsVue from '../components/Products.vue'
import Cart from '@/components/Cart.vue'
import { total } from '@/models/cart'
import { amount } from '@/models/stripe'
import { ref } from 'vue'
import { toFixed } from '../models/utilities'

const cashModal = ref(false)
const remainingTotal = ref(0)
const cash = ref()
const change = ref()
const insufficient = ref(false)
const session = useSession()

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

const transaction_state = ref('none')
function payCard() {
  if (session.user && total.value !== 0) {
    console.log('Paying with card, user is signed in and cart total is not 0.')
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
    addMessage(
      `Processing payment of ${amt} for reader ${session.user.stripe_data.stripe_reader_id}`,
      'info'
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
        addMessage('Payment has been processed. Thanks!', 'success')
        transaction_state.value = 'none'
      })
    })
  }
}
</script>

<template>
  <div class="notifications box">
    <template v-for="(msg, i) in session.messages">
      <div class="notification" :class="`is-${msg.type}`">
        <p class="content">
          {{ msg.msg }}
        </p>
        <button class="delete" @click="deleteMessage(i)"></button>
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
              @click="payCard"
              :class="{ 'is-loading': transaction_state == 'loading' }"
            >
              Pay Card
            </button>
          </div>
        </div>
        <div class="field is-grouped">
          <!-- <div class="control is-expanded">
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
          </div> -->
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
