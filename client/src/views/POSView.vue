<script setup lang="ts">
import { addMessage, useSession } from '@/models/session'
import ProductsVue from '../components/Products.vue'
import Cart from '@/components/Cart.vue'
import { removeFromCart, resetEditQuantity, total, removeAll, resetAge, addToCart } from '@/models/cart'
import { transaction_state, payCard } from '@/models/stripe'
import { inject, ref } from 'vue'
import { toFixed } from '../models/utilities'
import { toggleOff, updateProducts } from '@/models/searchbar'
import { getProducts, type Product } from '@/models/products'

const { notificationsIsActive, updateNotification } = inject<any>('notifications')
const session = useSession()

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
      remainingTotal.value.toFixed(2) +
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
  //reset filters and search
  toggleOff()
  //reset birthday
  resetAge()
}

updateProducts();

const prods = ref<Product[]>([])
if (session.user) {
  getProducts().then((res) => {
    prods.value = res.data
  })
}

let upc = ''
const isScanning = ref(false)
function barcodeScanner(e: KeyboardEvent) {
  if ((e.target as HTMLElement).localName !== 'input') {
    if (isScanning.value) {
      // Scanner is scanning, append to UPC variable if anything but enter is pressed.
      // IF enter is pressed, end the scan.
      if (e.key == 'Enter') {
        console.log('Barcode entered: ' + upc)
        // Filter/find product based on code scanned.
        if (upc == '' || upc === undefined) {
          console.log('Blank code')
        } else {
          const productToAdd = prods.value.find((prod) => prod.UPC.toLowerCase().includes(upc))
          if (productToAdd !== undefined) {
            addToCart(productToAdd)
          }
          console.log(productToAdd ? productToAdd.name : 'nothing' + ' will be added to cart')
        }
        // Reset upc variable.
        upc = ''
        // Set scan state to false.
        isScanning.value = false
      } else if (e.key == 'NumLock') {
        // If num lock is pressed, skip since already scanning.
        console.log('Skipping numlock input since already scanning.')
      } else {
        upc += e.key
        console.log(e.key)
      }
    } else {
      // Scanner is not scanning, check to see if NumLock key was put. This indicates the scanner sequence.
      // If numlock, set scanning state to true.
      if (e.key === 'NumLock' || e.key === 'Enter') {
        isScanning.value = true
        console.log('NumLock was pressed, reading scanner input.')
        //console.log(e.target ? (e.target as HTMLElement).localName : '')
      }
    }
  }
}

window.removeEventListener('keydown', barcodeScanner)
window.addEventListener('keydown', barcodeScanner)
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
                      <input class="input" v-model="cash" type="number" placeholder="Cash Received" />
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
            <button class="button is-info is-fullwidth" @click="payCard(total)"
              :class="{ 'is-loading': transaction_state == 'loading' }">
              Pay Card
            </button>
          </div>
        </div>
        <div class="container">
          <div class="field is-grouped">
            <div class="control is-expanded">
              <button class="button is-dark is-fullwidth is-rounded" @click="updateNotification(!notificationsIsActive)">
                Toggle notifications
              </button>
            </div>
            <div class="control is-expanded">
              <button class="button is-dark is-fullwidth is-rounded" @click="newCustomer()">
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
