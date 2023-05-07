<script setup lang="ts">
import { ref } from 'vue'
import { getProducts, type Product, deleteProduct } from '@/models/products'
import GenModals from '@/components/GeneralModals.vue'
import { confirm } from '@/models/generalModals'
import { addMessage } from '@/models/session'

const products = ref<Product[]>([])
getProducts().then((data) => {
  products.value = data.data
})

function delProduct(product: Product) {
  confirm('Are you sure you want to delete this?', 'Question')
    .then(() => {
      console.log('DELETING PRODUCT: ' + product._id)
      deleteProduct(product).then((res) => {
        addMessage(`Deleted product, ${product.name}, ${product._id}`, 'success')
        const index = products.value.findIndex((p) => p._id === product._id)
        products.value.splice(index, 1)
      })
    })
    .catch(() => {
      console.log('NOT DELETING PRODUCT: ' + product._id)
      addMessage(`Did not delete, ${product.name}, ${product._id}`, 'info')
    })
}
</script>

<template>
  <gen-modals></gen-modals>
  <div class="admin-products-list">
    <router-link to="/admin/products/edit" class="button is-primary admin-add-product">
      <div class="icon">
        <i class="fas fa-plus"></i>
      </div>
      <span>Add a Product</span>
    </router-link>

    <h1 class="title has-text-light">Products</h1>

    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">SKU</th>
          <th scope="col">UPC</th>
          <th scope="col">Price</th>
          <th scope="col">Category</th>
          <th scope="col">Stock</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products">
          <td>
            {{ product._id }}
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.SKU }}</td>
          <td>{{ product.UPC }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <router-link :to="'/admin/products/edit/' + product._id" class="button">
              <div class="icon">
                <i class="fas fa-edit"></i>
              </div>
            </router-link>
            <button class="button" @click="delProduct(product)">
              <div class="icon">
                <i class="fas fa-trash"></i>
              </div>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-product-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.admin-add-product {
  float: right;
}
</style>
