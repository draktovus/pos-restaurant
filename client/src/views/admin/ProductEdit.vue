<script setup lang="ts">
import type { Product } from '@/models/products'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct, createProduct, updateProduct } from '@/models/products'
import { useSession, addMessage } from '@/models/session'
const session = useSession()
const route = useRoute()

const product = ref<Product>({} as Product)
console.log(route.params.id)
getProduct(route.params.id as string).then((data) => {
  product.value = data.data ?? ({} as Product)
  console.log(product.value)
})

function save() {
  if (product.value._id) {
    updateProduct(product.value)
  } else {
    createProduct(product.value).then((data) => {
      console.log(data)
      addMessage('Product created', 'success')
    })
  }
}
</script>

<template>
  <form class="admin-product-edit" @submit.prevent="save()">
    <h1 class="title" v-if="product._id">Edit Product</h1>
    <h1 class="title" v-else>Add New Product</h1>

    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Title" v-model="product.name" />
      </div>
    </div>

    <div class="field">
      <label class="label">Id</label>
      <div class="control">
        <input class="input" type="text" placeholder="id" v-model="product._id" disabled />
      </div>
    </div>

    <div class="field">
      <label class="label">SKU</label>
      <div class="control">
        <input class="input" type="text" placeholder="SKU" v-model="product.SKU" />
      </div>
    </div>

    <div class="field">
      <label class="label">UPC</label>
      <div class="control">
        <input class="input" type="text" placeholder="UPC" v-model="product.UPC" />
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Description"
          v-model="product.description"
        ></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Price</label>
      <div class="control">
        <input class="input" type="number" placeholder="Price" step="0.01" v-model="product.price" />
      </div>
    </div>

    <div class="field">
      <label class="label">Category</label>
      <div class="control">
        <input class="input" type="text" placeholder="Category" v-model="product.category" />
      </div>
    </div>

    <div class="field">
      <label class="label">Stock</label>
      <div class="control">
        <input class="input" type="number" placeholder="Stock" v-model="product.quantity" />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
