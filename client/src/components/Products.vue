<script setup lang="ts">
import { ref } from 'vue'
import { getProducts, type Product } from '@/models/products'
import { addToCart, setShowIDModal, isOfAge, isOfAge2, isChecked, setIsChecked } from '../models/cart'
import { toggle, filteredList, filteredProducts, products, check1, check2, check3, check4, check5, check6, input } from '../models/searchbar'
import IDModal from '@/components/IDModal.vue'

const selectedProduct = ref<Product>()

getProducts().then((res) => {
  products.value = res.data
  filteredProducts.value = res.data
})
function canBuy(ofAge: boolean) {
  isOfAge.value = ofAge
  isOfAge2.value = ofAge
  setIsChecked(1)
}
function setIsOfAge(product: Product) {
  if (isChecked.value < 1) {
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
        />
      </span>
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
  </div>

  <IDModal @can-buy="canBuy" />

  <div class="columns is-multiline is-mobile">
    <div>
      <label class="checkbox">
        <input type="checkbox" v-model="check1" @click="toggle('Breakfast')" />
        Breakfast
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="check2" @click="toggle('Lunch')" />
        Lunch
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="check3" @click="toggle('Dinner')" />
        Dinner
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="check4" @click="toggle('Sides')" />
        Sides
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="check5" @click="toggle('Drinks')" />
        Drinks
      </label>
      <label class="checkbox">
        <input type="checkbox" v-model="check6" @click="toggle('Requires ID')" />
        Requires ID
      </label>
    </div>
  </div>

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
.checkbox {
  flex-basis: 12rem;
  flex-grow: 1;
  padding: 0.5rem;
  margin: 1rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
</style>
