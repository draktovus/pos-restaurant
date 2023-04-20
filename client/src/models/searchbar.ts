import { ref } from 'vue'
import { getProducts, type Product } from '@/models/products'

export const products = ref<Product[]>([])
const filteredProducts = ref<Product[]>([])
getProducts().then((data) => {
  products.value = data.data
  filteredProducts.value = data.data})
}
//export const input = ref("")
const breakfastBox = ref(false);
const lunchBox = ref(false);
const dinnerBox = ref(false);
const sidesBox = ref(false);
const requiresIdBox = ref(false);

export function filteredList(inp: String) {
    products.value = products.value.filter((product: Product) =>
      product.title.toLowerCase().includes(inp.toLowerCase())
    )
    console.log(inp);
}

export function toggle(s: string) {
    switch (s) {
      case "Breakfast":
        breakfastBox.value = !breakfastBox.value;
        break;
      case "Lunch":
        lunchBox.value = !lunchBox.value;
        break;
      case "Dinner":
        dinnerBox.value = !dinnerBox.value;
        break;
      case "Sides":
        sidesBox.value = !sidesBox.value;
        break;
      case "Requires ID":
        requiresIdBox.value = !requiresIdBox.value;
        break;
    }
    filterProducts();
}  

function filterProducts() {
  if (requiresIdBox.value == true) {
    products.value = products.value.filter((product: Product) =>
    product.requiresId)
    console.log("A");
  } 
  if (requiresIdBox.value == true && lunchBox.value == true) {
    products.value = products.value.filter((product: Product) =>
    product.requiresId && product.category == "lunch")
    console.log("B");
  }
  
  /*else {
    products.value = getProducts().filter((product: Product) =>
    product.title.toLowerCase().includes(input.value.toLowerCase()))
  }*/
}