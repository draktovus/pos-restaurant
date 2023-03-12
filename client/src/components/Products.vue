<script setup lang="ts">
import { ref } from 'vue';
import { getProducts } from '@/models/products';
import { addToCart } from '../models/cart';
const products = getProducts()
</script>

<template>
    <div class="search block">
        <div class="control has-icons-left">
            <span class="searchbar">
                <input class="input is-rounded" type="text" placeholder="Search">
            </span>
            <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
            </span>
        </div>
    </div>

    <div class="product-list">
            <div class="product" v-for="product in products" :key="product.id">
                <img :src="product.thumbnail" :alt="product.title" />
                <h3>{{ product.title }}</h3>
                <p>{{ product.description }}</p>
                <p>
                    <span>$</span>
                    <i class="price">
                        {{ product.price }}
                    </i>
                </p>
                <button class="button is-primary" @click="addToCart(product)">+</button>
            </div>
        </div>
</template>


<style scoped>
    .product-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: aliceblue;
    }
    .product {
        flex-basis: 12rem;
        flex-grow: 1;
        padding: .5rem;
        margin: 1rem;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    }
    .price {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>