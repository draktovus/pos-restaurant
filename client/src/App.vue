<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { getReaders, getLocations } from './models/stripe'

getReaders()
getLocations()
</script>

<template>
  <NavBar />
  <div class="section">
    <RouterView />
  </div>
</template>

<style scoped></style>
