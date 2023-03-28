<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from './components/NavBar.vue';
import IDModal  from "./components/IDModal.vue";
</script>

<template>

  <NavBar />

    <div class="container">
      <RouterView />
    </div>

  <IDModal />
    
</template>

<style scoped>

</style>
