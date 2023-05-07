import { computed, ref } from 'vue'
import type { Product } from './products'

const cart = ref([] as CartItem[])
const showIDModal = ref(false)
export const newQuantity = ref(1)
export const birthday = ref('')
export const ofAge = ref(false)
export let isOfAge = ref(false)
export let isOfAge2 = ref(false)
export let isChecked = ref(0)
export let showModal = ref(false)
export const checkAge = () => {
  showModal.value = false
}

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

export function removeAll() {
  for (let i = cart.value.length - 1; i >= 0; i--) {
    removeFromCart(i, cart.value[i].product)
  }
}

export function resetEditQuantity() {
  newQuantity.value = 0
}

export function resetAge() {
  ofAge.value = false
  isOfAge.value = false
  isOfAge2.value = false
  isChecked.value = 0
  showIDModal.value = false
  birthday.value = ''
}

export function setIsChecked(value: number) {
  isChecked.value = value
}

export const quantity = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))

export const total = computed(() =>
  cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
)
