<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { getProducts, type Product } from './models/products'
import { addToCart } from './models/cart'
import NavBar from './components/NavBar.vue'

const prods = ref<Product[]>([])
getProducts().then((res) => {
  prods.value = res.data
})

let upc = ''
const isScanning = ref(false)
function barcodeScanner(e: KeyboardEvent) {
  if ((e.target as HTMLElement).localName !== 'input') {
    if (isScanning.value) {
      // Scanner is scanning, append to UPC variable if anything but enter is pressed.
      // IF enter is pressed, end the scan.
      if (e.key == 'Enter') {
        console.log('Barcode entered: ' + upc)
        // Filter/find product based on code scanned.
        if (upc = ''){
          console.log("Blank code")
        }
        else{
          const productToAdd = prods.value.find((prod) => prod.UPC.toLowerCase().includes(upc))
          if (productToAdd !== undefined) {
            addToCart(productToAdd)
          }
          console.log(productToAdd ? productToAdd.name : 'nothing' + ' will be added to cart')
        }
        // Reset upc variable.
        upc = ''
        // Set scan state to false.
        isScanning.value = false
      } else if (e.key == 'NumLock') {
        // If num lock is pressed, skip since already scanning.
        console.log('Skipping numlock input since already scanning.')
      } else {
        upc += e.key
        console.log(e.key)
      }
    } else {
      // Scanner is not scanning, check to see if NumLock key was put. This indicates the scanner sequence.
      // If numlock, set scanning state to true.
      if (e.key === 'NumLock') {
        isScanning.value = true
        console.log('NumLock was pressed, reading scanner input.')
        //console.log(e.target ? (e.target as HTMLElement).localName : '')
      }
    }
  }
}

window.removeEventListener('keydown', barcodeScanner)
window.addEventListener('keydown', barcodeScanner)
</script>

<template>
  <NavBar />
  <div class="section">
    <RouterView />
  </div>
</template>

<style scoped></style>
