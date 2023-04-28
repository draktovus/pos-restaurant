import { computed, ref, type ComputedRef } from 'vue'
import { getProducts, type Product } from '@/models/products'

export const products = ref<Product[]>([])
export const filteredProducts = ref<Product[]>([])
const breakfastBox = ref(false)
const lunchBox = ref(false)
const dinnerBox = ref(false)
const sidesBox = ref(false)
const drinksBox = ref(false)
const requiresIdBox = ref(false)
const val = ref('')
getProducts().then((data) => {
  products.value = data.data
  filteredProducts.value = data.data
})

export function filteredList(i: string) {
  let filtered = null
  if (
    !breakfastBox.value &&
    !lunchBox.value &&
    !dinnerBox.value &&
    !sidesBox.value &&
    !drinksBox.value &&
    !requiresIdBox.value
  ) {
    // fixes the case if no boxes are checked, make it so all boxes are checked so all show
    filtered = products.value
  } else {
    filtered = products.value.filter((product) => {
      return (
        product.category == (breakfastBox.value ? 'Breakfast' : '') ||
        product.category == (lunchBox.value ? 'Lunch' : '') ||
        product.category == (dinnerBox.value ? 'Dinner' : '') ||
        product.category == (sidesBox.value ? 'Sides' : '') ||
        product.category == (drinksBox.value ? 'Drinks' : '') ||
        (requiresIdBox.value ? product.identification : false)
      )
    })
  }

  filtered = filtered.filter((product: Product) =>
    product.name.toLowerCase().includes(i.toLowerCase())
  )

  filteredProducts.value = filtered
  val.value = i
}

export function toggle(s: string) {
  switch (s) {
    case 'Breakfast':
      breakfastBox.value = !breakfastBox.value
      break
    case 'Lunch':
      lunchBox.value = !lunchBox.value
      break
    case 'Dinner':
      dinnerBox.value = !dinnerBox.value
      break
    case 'Sides':
      sidesBox.value = !sidesBox.value
      break
    case 'Drinks':
      drinksBox.value = !drinksBox.value
      break
    case 'Requires ID':
      requiresIdBox.value = !requiresIdBox.value
      break
  }
  filteredList(val.value)
}
