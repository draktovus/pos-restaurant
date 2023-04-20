<script setup lang="ts">
import { ref } from 'vue'
import { getProducts, type Product } from '@/models/products'
import { addToCart, setShowIDModal } from '../models/cart'
import { toggle, filteredList, filteredProducts, products } from '../models/searchbar'
import IDModal from '@/components/IDModal.vue'
const selectedProduct = ref<Product>()
let isOfAge = ref(false)
let isOfAge2 = ref(false)
let isChecked = 0
const sortDropdown = ref(false);
const input = ref('')
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Sides', 'Drinks', 'Requires ID']

getProducts().then((res) => {
  products.value = res.data
  filteredProducts.value = res.data
})
function toggleDropdown() {
  sortDropdown.value = !sortDropdown.value
}
function closeDropdown() {
  sortDropdown.value = false
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
          @input="filteredList(input)"
          @click="closeDropdown()"
        />
      </span>
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <div class="dropdown" :class="{ 'is-active': sortDropdown }">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggleDropdown()">
          <span>Sort</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <template v-for="category in categories">
            <div href="#" class="dropdown-item">
              <label class="checkbox">
                <input type="checkbox" @click="toggle(category)">
                  {{ category }}
              </label>
            </div>
          </template>
        </div>
      </div>
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
.dropdown {
  margin: 1rem;
}
</style>