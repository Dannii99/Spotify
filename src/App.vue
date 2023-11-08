<template>
  <main class=" grid gap-4 p-2"  :class="[currentPath != '/login' ? 'grid-cols-custom' : 'grid-cols-1 m-auto']">
    <Header v-if="currentPath != '/login'" />
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
  import Header from './components/Header.vue'
  import { ref, onMounted } from 'vue'

  // Acceder a la ruta (URL) actual
  const currentPath = window.location.pathname;

</script>

<style scoped lang="scss">
  .grid-cols-custom {
    grid-template-columns: 72px 1fr;
  }

</style>
