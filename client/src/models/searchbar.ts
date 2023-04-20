import { ref } from 'vue'
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
  let filtered = products.value
  //filter list by checkboxes, if more than one is checked, filter by all of them
  if (breakfastBox.value && lunchBox.value && dinnerBox.value && sidesBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Dinner" || product.category === "Sides" || product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value && lunchBox.value && dinnerBox.value && sidesBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Dinner" || product.category === "Sides" || product.category === "Drinks")
  } else if (breakfastBox.value && lunchBox.value && dinnerBox.value && sidesBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Dinner" || product.category === "Sides" || product.identification)
  } else if (breakfastBox.value && lunchBox.value && dinnerBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Dinner" || product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value && lunchBox.value && sidesBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Sides" || product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value && dinnerBox.value && sidesBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Dinner" || product.category === "Sides" || product.category === "Drinks" || product.identification)
  } else if (lunchBox.value && dinnerBox.value && sidesBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Dinner" || product.category === "Sides" || product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value && lunchBox.value && dinnerBox.value && sidesBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Dinner" || product.category === "Sides")
  } else if (breakfastBox.value && lunchBox.value && dinnerBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Dinner" || product.category === "Drinks")
  } else if (breakfastBox.value && lunchBox.value && dinnerBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Dinner" || product.identification)
  } else if (breakfastBox.value && lunchBox.value && sidesBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Sides" || product.category === "Drinks")
  } else if (breakfastBox.value && lunchBox.value && sidesBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Sides" || product.identification)
  } else if (breakfastBox.value && lunchBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value && dinnerBox.value && sidesBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Dinner" || product.category === "Sides" || product.category === "Drinks")
  } else if (breakfastBox.value && dinnerBox.value && sidesBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Dinner" || product.category === "Sides" || product.identification)
  } else if (breakfastBox.value && dinnerBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Dinner" || product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value && sidesBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Sides" || product.category === "Drinks" || product.identification)
  } else if (lunchBox.value && dinnerBox.value && sidesBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Dinner" || product.category === "Sides" || product.category === "Drinks")
  } else if (lunchBox.value && dinnerBox.value && sidesBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Dinner" || product.category === "Sides" || product.identification)
  } else if (lunchBox.value && dinnerBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Dinner" || product.category === "Drinks" || product.identification)
  } else if (lunchBox.value && sidesBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Sides" || product.category === "Drinks" || product.identification)
  } else if (dinnerBox.value && sidesBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Dinner" || product.category === "Sides" || product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value && lunchBox.value && dinnerBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Dinner")
  } else if (breakfastBox.value && lunchBox.value && sidesBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Sides")
  } else if (breakfastBox.value && lunchBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.category === "Drinks")
  } else if (breakfastBox.value && lunchBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch" || product.identification)
  } else if (breakfastBox.value && dinnerBox.value && sidesBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Dinner" || product.category === "Sides")
  } else if (breakfastBox.value && dinnerBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Dinner" || product.category === "Drinks")
  } else if (breakfastBox.value && dinnerBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Dinner" || product.identification)
  } else if (breakfastBox.value && sidesBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Sides" || product.category === "Drinks")
  } else if (breakfastBox.value && sidesBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Sides" || product.identification)
  } else if (breakfastBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Drinks" || product.identification)
  } else if (lunchBox.value && dinnerBox.value && sidesBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Dinner" || product.category === "Sides")
  } else if (lunchBox.value && dinnerBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Dinner" || product.category === "Drinks")
  } else if (lunchBox.value && dinnerBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Dinner" || product.identification)
  } else if (lunchBox.value && sidesBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Sides" || product.category === "Drinks")
  } else if (lunchBox.value && sidesBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Sides" || product.identification)
  } else if (lunchBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Drinks" || product.identification)
  } else if (dinnerBox.value && sidesBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Dinner" || product.category === "Sides" || product.category === "Drinks")
  } else if (dinnerBox.value && sidesBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Dinner" || product.category === "Sides" || product.identification)
  } else if (dinnerBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Dinner" || product.category === "Drinks" || product.identification)
  } else if (sidesBox.value && drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Sides" || product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value && lunchBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Lunch")
  } else if (breakfastBox.value && dinnerBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Dinner")
  } else if (breakfastBox.value && sidesBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Sides")
  } else if (breakfastBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.category === "Drinks")
  } else if (breakfastBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast" || product.identification)
  } else if (lunchBox.value && dinnerBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Dinner")
  } else if (lunchBox.value && sidesBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Sides")
  } else if (lunchBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.category === "Drinks")
  } else if (lunchBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch" || product.identification)
  } else if (dinnerBox.value && sidesBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Dinner" || product.category === "Sides")
  } else if (dinnerBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Dinner" || product.category === "Drinks")
  } else if (dinnerBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Dinner" || product.identification)
  } else if (sidesBox.value && drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Sides" || product.category === "Drinks")
  } else if (sidesBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Sides" || product.identification)
  } else if (drinksBox.value && requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Drinks" || product.identification)
  } else if (breakfastBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Breakfast")
  } else if (lunchBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Lunch")
  } else if (dinnerBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Dinner")
  } else if (sidesBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Sides")
  } else if (drinksBox.value) {
    filtered = filtered.filter((product: Product) => product.category === "Drinks")
  } else if (requiresIdBox.value) {
    filtered = filtered.filter((product: Product) => product.identification)
  } else {
    filtered = products.value
  }
  

  filtered = filtered.filter((product: Product) =>
    product.name.toLowerCase().includes(i.toLowerCase())
  )

  filteredProducts.value = filtered
  val.value = i
}

export function toggle(s: string) {
    switch (s) {
      case "Breakfast":
        breakfastBox.value = !breakfastBox.value
        break
      case "Lunch":
        lunchBox.value = !lunchBox.value
        break
      case "Dinner":
        dinnerBox.value = !dinnerBox.value
        break
      case "Sides":
        sidesBox.value = !sidesBox.value
        break
      case "Drinks":
        drinksBox.value = !drinksBox.value
        break
      case "Requires ID":
        requiresIdBox.value = !requiresIdBox.value
        break
    }
    filteredList(val.value)
}  