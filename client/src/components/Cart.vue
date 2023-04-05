<script lang="ts">
import { defineComponent } from 'vue';
import { useCart, total, removeFromCart } from '@/models/cart';
import { quantity } from '../models/cart'

export default defineComponent({
  setup() {
    const cart = useCart();
    return {
      cart,
      total,
      removeFromCart,
      quantity,
    };
  },
});
</script>

<template>
    <div class="cart">
      <h1 class="title">
        Cart
        <small>
          ${{ total }}
          ({{ quantity }} items)
        </small>
      </h1>
      <p></p>
      <div class="cart-item" v-for="item, i in cart">
        <div>
           <b>{{ item.product.title }}</b> 
        </div>
        <div>
          <p>
            ${{ item.product.price }}
            x
            <select v-model="item.quantity" class="quantity-dropdown">
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
          </p>
        </div>
        <button class="button is-danger" @click="removeFromCart(i, item.product)">
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </template>
    
  <style scoped>
  .cart {
        margin: 5px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background-color: white;
        border-color: black;
    }
    .cart-item {
        display: grid;
        grid-template-columns: 2fr 1fr 50px;
        margin: 5px;
        padding-right: 5px;
        border-radius: 5px;
        overflow: hidden;
        background-color:rgb(244, 239, 239);
    }
    
    small {
        font-size: 0.5em;
    }
  </style> 