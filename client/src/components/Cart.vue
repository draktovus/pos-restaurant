<script setup lang="ts">
import { useCart, total, removeFromCart } from '@/models/cart'
import { quantity, newQuantity } from '../models/cart'
import { toFixed } from '../models/utilities'
import type { Product } from '@/models/products'
import { ref } from 'vue'
import { closeModal } from '@/models/generalModals'

const cart = useCart()
const quantityModal = ref(false)
const indexRef = ref(0)
const productRef = ref<Product>()
const oldQuantityRef = ref(1)

function editModal(index: number, product: Product, oldQuantity: number) {
  indexRef.value = index
  productRef.value = product
  oldQuantityRef.value = oldQuantity
  quantityModal.value = true
}

function closeEditModal() {
  cart.value[indexRef.value].quantity = newQuantity.value
  oldQuantityRef.value = newQuantity.value
  quantityModal.value = false
}
</script>

<template>
  <div class="cart has-background-grey-darker">
    <h1 class="title has-text-light">
      Cart
      <small> ${{ toFixed(total, 2) }} ({{ quantity }} items) </small>
    </h1>
    <p></p>

    <div class="has-background-grey-dark" v-for="(item, i) in cart" :key="item.productId">
      <div class="columns is-centered is-vcentered">
        <div class="column is-half">
          <div class="content has-text-light has-text-centered">
            {{ item.product.name }}
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="has-text-light mt-2 has-text-centered">
            ${{ toFixed(item.product.price, 2) }} @ {{ item.quantity }}
          </div>
        </div>

        <div class="column is-auto">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <button
                class="button is-light is-outlined is-fullwidth"
                @click="editModal(i, item.product, item.quantity)"
              >
                <span class="icon">
                  <i class="fas fa-edit" />
                </span>
              </button>
            </p>
            <p class="control is-expanded">
              <button
                class="button is-fullwidth is-danger is-outlined"
                @click="removeFromCart(i, item.product)"
              >
                <span class="icon">
                  <i class="fas fa-trash"></i>
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': quantityModal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <h1 class="title">Edit Quantity</h1>
          <div class="field">
            <label class="label">New quantity:</label>
            <input
              class="input"
              v-model="newQuantity"
              type="number"
              placeholder="New quantity..."
            />
          </div>
          <button class="button is-success" @click="closeEditModal()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: white;
  border-color: black;
}
.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 50px;
  margin: 5px;
  padding-right: 5px;
  border-radius: 5px;
  overflow: hidden;
  background-color: rgb(244, 239, 239);
}

small {
  font-size: 0.5em;
}
</style>
