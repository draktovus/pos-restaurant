import products from '@/data/products.json'
import type { DataListEnvelope, DataEnvelope } from './fetch'
import { api } from "./session";

/**
 * {
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
      ]
    },
 */

/**
 * {
      "_id": "6435d8768e55484aac89ec52",
      "name": "Pancake",
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
      _id: string;
      name: string;
      quantity: number;
      SKU: string;
      UPC: string;
      description: string;
      price: number;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
      category: string;
    }
    
    // export function getProducts(): Product[] {
    //   return products.products
    // }
    export function getProducts(): Promise<DataListEnvelope<Product>> {
    
      return api('products')
    
    }
    
    export function getProduct(id: number): Promise<DataEnvelope<Product>> {
      return api('products/${id}')
    }
    
    export function createProduct(product: Product): Promise<DataEnvelope<Product>> {
      return api('products', product)
    }