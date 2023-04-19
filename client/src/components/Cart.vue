<script setup lang="ts">
import { useCart, total, removeFromCart } from '@/models/cart'
import { quantity } from '../models/cart'

const cart = useCart()

// Custom toFixed function ripped from https://stackoverflow.com/questions/4187146/truncate-number-to-two-decimal-places-without-rounding
function toFixed(num: number, fixed: number) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?')
  const result = num.toString().match(re)
  return result ? result[0] : 0
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
              <button class="button is-light is-outlined is-fullwidth">
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
