<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <!-- Navbar component -->
  <header>
    <NavBar />
  </header>

  <main>
    <div class="container">
      <!-- Pages go here -->
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
