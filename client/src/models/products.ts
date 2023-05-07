import type { DataListEnvelope, DataEnvelope } from './fetch'
import { api } from './session'

/**
 * {
      "_id": "6435d8768e55484aac89ec52",
      "name": "Pancake",
      "identification": {
        "requiresId": true,
        "_id": "6435dccfe302dfa6457d860b"
      },
      "quantity": 1,
      "SKU": "ZLJKHQ0512",
      "UPC": "012938951",
      "description": "Delicious pancakes served with maple honey syrup.",
      "price": 5.999,
      "createdAt": "2023-04-11T22:00:22.820Z",
      "updatedAt": "2023-04-11T22:00:22.820Z",
      "__v": 0,
      "category": "Breakfast"
    }
 */
export interface Product {
  _id: string
  name: string
  identification?: {
    requiresId: boolean
    _id: string
  }
  quantity: number
  SKU: string
  UPC: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
  __v: number
  category: string
}

// export function getProducts(): Product[] {
//   return products.products
// }
export function getProducts(): Promise<DataListEnvelope<Product>> {
  return api('products')
}

export function getProduct(id: string): Promise<DataEnvelope<Product>> {
  return api(`products/${id}`)
}

export function createProduct(product: Product): Promise<DataEnvelope<Product>> {
  return api('products/create', product, 'POST')
}

export function updateProduct(product: Product): Promise<DataEnvelope<Product>> {
  return api(`products/update/${product._id}`, product, 'PATCH')
}

export function deleteProduct(product: Product): Promise<DataEnvelope<Product>> {
  return api(`products/delete/${product._id}`, product, 'DELETE')
}
