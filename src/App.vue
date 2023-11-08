<template>
  <main class=" grid gap-4 p-2"  :class="[currentPath != '/login' ? 'grid-cols-custom' : 'grid-cols-1 m-auto']">
    <Header v-if="currentPath != '/login'" />
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
  import Header from './components/Header.vue'
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';

  // Acceder a la ruta (URL) actual
  const route = useRoute();
  const currentPath = ref(window.location.pathname);
  
  onMounted( () => {
    // ...
  });
  
  // Escuchar cambios en la ruta utilizando watch
  watch(() => route.path, (newPath, oldPath) => {
    currentPath.value = newPath;
    //console.log(currentPath.value);
    
  });

</script>

<style scoped lang="scss">
  .grid-cols-custom {
    grid-template-columns: 72px 1fr;
  }

</style>