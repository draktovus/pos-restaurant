import { computed, ref } from 'vue'
import type { Product } from './products'

const cart = ref([] as CartItem[])
const showIDModal = ref(false)
export const newQuantity = ref(1)

export function useCart() {
  return cart
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
}

export function addToCart(product: Product) {
  const item = cart.value.find((p) => p.productId == product._id)
  if (item) {
    item.quantity++
  } else {
    cart.value.push({
      productId: product._id,
      product,
      quantity: 1
    })
  }
}

export function setShowIDModal(value: boolean) {
  showIDModal.value = value
}

export function getShowIDModal() {
  return showIDModal.value
}

export function removeFromCart(index: number, product: Product) {
  cart.value.splice(index, 1)
  if (product.identification) {
    setShowIDModal(false)
  }
}

export function removeAll(){
  for(let i = cart.value.length - 1; i >= 0; i--){
    removeFromCart(i, cart.value[i].product)
  }
}

export function resetEditQuantity() {
  newQuantity.value = 0
}

export const quantity = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))

export const total = computed(() =>
  cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
)
