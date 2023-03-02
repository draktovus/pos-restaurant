<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- Navbar component -->
  <header></header>

  <main>
    <div class="container">
      <!-- Pages go here -->
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
