<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {ref} from 'vue'
import { getProducts, type Product } from './models/products'
import NavBar from './components/NavBar.vue'

const prods = ref<Product[]>([])
getProducts().then(res=>{
  prods.value = res.data
})

let upc = ''
function barcodeScanner(e:KeyboardEvent){
  console.log(e.target ? (e.target as HTMLElement).localName : '')
  if ((e.target as HTMLElement).localName !== 'input') {
    if (e.key == "Enter") {
      console.log("Barcode entered: " + upc)
      const productToAdd = prods.value.find((prod)=>prod.UPC.toLowerCase().includes(upc))
      console.log(productToAdd ? productToAdd.name : 'nothing' + ' will be added to cart')
      upc = ''
    }
    else {
      upc += e.key
      console.log(e.key)
    }
  }
}

window.removeEventListener('keydown', barcodeScanner)
window.addEventListener('keydown', barcodeScanner)
/**
 * window.addEventListener('keypress', (e) => {
  console.log(e.target ? (e.target as HTMLElement).localName : '')
  if ((e.target as HTMLElement).localName !== 'input') {
    if (e.key == "Enter") {
      console.log("Barcode entered: " + upc)
      const productToAdd = prods.value.find((prod)=>prod.UPC.toLowerCase().includes(upc))
      console.log(productToAdd ? productToAdd.name : 'nothing' + ' will be added to cart')
      upc = ''
    }
    else {
      upc += e.key
      console.log(e.key)
    }
  }
})
*/
</script>

<template>
  <NavBar />
  <div class="section">
    <RouterView />
  </div>
</template>

<style scoped></style>
