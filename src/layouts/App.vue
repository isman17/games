<script setup>
import Header from './Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />
  <div class="container mx-auto px-4 md:px-8 pt-20 pb-4">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
