<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light">
              <strong>Admin</strong>
            </a>
            <RouterLink class="button is-light" to="/login">
              <strong>Login</strong>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="tabs mb-0 is-toggle">
        <ul>
          <li class="is-active"><a>Breakfast</a></li>
          <li><a>Lunch</a></li>
          <li><a>Dinner</a></li>
          <li><a>Sides</a></li>
          <li><a>Drinks</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-danger">
              <strong>Checkout</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .tabs li a{
    color: white;
  }
</style>
