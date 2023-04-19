<script setup lang="ts">
import { ref } from 'vue'
import { getProducts, type Product } from '@/models/products'
import { addToCart, setShowIDModal } from '../models/cart'
import IDModal from '@/components/IDModal.vue'
const products = ref<Product[]>([])
const filteredProducts = ref<Product[]>([])
const selectedProduct = ref<Product>()
let isOfAge = ref(false)
let isOfAge2 = ref(false)
let isChecked = 0
const input = ref('')

getProducts().then((res) => {
  products.value = res.data
  filteredProducts.value = res.data
})

function filteredList() {
  filteredProducts.value = products.value.filter((product: Product) =>
    product.name.toLowerCase().includes(input.value.toLowerCase())
  )
}
function canBuy(ofAge: boolean) {
  isOfAge.value = ofAge
  isOfAge2.value = ofAge
  isChecked = 1
}
function setIsOfAge(product: Product) {
  if (isChecked < 1) {
    setShowIDModal(true)
  }
  selectedProduct.value = product
  addProduct(selectedProduct.value)
}

function addProduct(product: Product) {
  if (isOfAge.value && selectedProduct.value) {
    addToCart(selectedProduct.value)
    isOfAge2.value = false
  }
}
</script>

<template>
  <div class="search block">
    <div class="control has-icons-left">
      <span class="searchbar">
        <input
          class="input is-rounded"
          type="text"
          v-model="input"
          placeholder="Search"
          @input="filteredList"
        />
      </span>
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>
  <IDModal @can-buy="canBuy" />

  <div class="columns is-multiline is-mobile">
    <template v-for="(product, index) in filteredProducts" :key="product.id">
      <div class="column is-full-mobile is-half-tablet is-one-quarter-desktop">
        <div
          v-if="product.identification"
          class="button is-dark is-inverted is-outlined is-fullwidth"
          @click="setIsOfAge(product)"
        >
          <p class="content has-text-centered has-text-justified is-clipped is-small-tablet">
            {{ product.name }}
          </p>
          <div v-if="isOfAge2">
            {{ addProduct(product) }}
          </div>
        </div>
        <div
          v-else
          class="button is-dark is-inverted is-outlined is-fullwidth"
          @click="addToCart(product)"
        >
          <p class="content has-text-centered has-text-justified is-clipped is-small-tablet">
            {{ product.name }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: aliceblue;
}
.product {
  flex-basis: 12rem;
  flex-grow: 1;
  padding: 0.5rem;
  margin: 1rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
.price {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
