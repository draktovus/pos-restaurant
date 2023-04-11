import { computed, ref } from 'vue'
import type { Product } from './products'

const cart = ref([] as CartItem[])
const showIDModal = ref(false)

export function useCart() {
  return cart
}

export interface CartItem {
  productId: number
  product: Product
  quantity: number
}

export function addToCart(product: Product) {
  const item = cart.value.find((p) => p.productId == product.id)
  if (item) {
    item.quantity++
  } else {
    cart.value.push({
      productId: product.id,
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
  if (product.requiresId) {
    setShowIDModal(false)
  }
}

export const quantity = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))

export const total = computed(() =>
  cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
)
