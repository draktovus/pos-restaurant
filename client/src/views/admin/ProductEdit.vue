<script setup lang="ts">
import type { Product } from '@/models/products'
import { ref, inject, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProduct, createProduct, updateProduct } from '@/models/products'
import { useSession, addMessage } from '@/models/session'
const session = useSession()
const route = useRoute()
const router = useRouter()

const product = ref<Product>({} as Product)
console.log(route.params.id)
if (route.params.id !== undefined && route.params.id !== '') {
  getProduct(route.params.id as string).then((data) => {
    product.value = data ? data.data : ({} as Product)
    console.log('got this as product for admin', product.value)
  })
}

function save() {
  if (product.value._id) {
    updateProduct(product.value).then((response) => {
      addMessage('Producted updated', 'success')
    })
  } else {
    createProduct(product.value).then((data) => {
      addMessage('Product created', 'success')
    })
  }
  router.push('/admin/products')
}

function cancel() {
  addMessage('Canceled product', 'info')
  router.push('/admin/products')
}
</script>

<template>
  <form class="admin-product-edit" @submit.prevent>
    <h1 class="title has-text-light" v-if="product._id">Edit Product</h1>
    <h1 class="title has-text-light" v-else>Add New Product</h1>

    <div class="field">
      <label class="label has-text-light">Title</label>
      <div class="control has-text-light">
        <input class="input" type="text" placeholder="Title" v-model="product.name" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Id</label>
      <div class="control">
        <input class="input" type="text" placeholder="id" v-model="product._id" disabled />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">SKU</label>
      <div class="control">
        <input class="input" type="text" placeholder="SKU" v-model="product.SKU" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">UPC</label>
      <div class="control">
        <input class="input" type="text" placeholder="UPC" v-model="product.UPC" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Description</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Description"
          v-model="product.description"
        ></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Price</label>
      <div class="control">
        <input
          class="input"
          type="number"
          placeholder="Price"
          step="0.01"
          v-model="product.price"
        />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Category</label>
      <div class="control">
        <input class="input" type="text" placeholder="Category" v-model="product.category" />
      </div>
    </div>

    <div class="field">
      <label class="label has-text-light">Stock</label>
      <div class="control">
        <input class="input" type="number" placeholder="Stock" v-model="product.quantity" />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary" @click="save">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light" @click="cancel">Cancel</button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
