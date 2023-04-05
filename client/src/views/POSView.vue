<script setup lang="ts">
import ProductsVue from '../components/Products.vue'
import Cart from '@/components/Cart.vue'
</script>

<template>
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
      <div class="container max-height">
        <Cart />
      </div>
      <div class="container">
        <div class="field is-grouped">
          <div class="control is-expanded">
            <button class="button is-success is-fullwidth">Pay Cash</button>
          </div>
          <div class="control is-expanded">
            <button class="button is-info is-fullwidth">Pay Card</button>
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
  height: calc(100vh - 20vh);
  overflow-y: scroll;
}
</style>
