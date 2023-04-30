<script setup lang="ts">
const props = defineProps<{
  title: string
  message: string
  type: 'danger' | 'success' | 'info' | 'warning'
  msg: { type: string; msg: string }
}>()
const emits = defineEmits<{
  (e: 'delete', id: void): void
}>()
</script>

<template>
  <div class="message" :class="`is-${props.type}`">
    <div class="message-header">
      {{ title }}
      <button class="delete" @click="emits('delete')"></button>
    </div>

    <div class="message-body">
      <div class="container">
        {{ message }}
      </div>
      <slot name="body"> </slot>
    </div>
  </div>
</template>

<style scoped></style>
