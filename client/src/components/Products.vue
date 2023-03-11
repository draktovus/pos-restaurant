<script setup lang="ts">
import { useProducts } from '@/models/products';
const products = useProducts()
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

    <div class="columns is-multiline is-mobile">
        <template v-for="product, index in products" :key="product.id">
            <div class="column is-full-mobile is-half-tablet is-one-quarter-desktop">
                <div class="button has-background-dark is-fullwidth">
                    <p class="content has-text-centered has-text-light">
                        {{ product.title }}
                    </p>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>

</style>