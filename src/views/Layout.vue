<template>
    <main class=" grid gap-4 p-2 grid-cols-custom">
      <Sidebar />
      <div>
        <Header />
        <router-view />
      </div>
    </main>
</template>

<script setup lang="ts">
    import Header from './../components/Header.vue'
    import Sidebar from './../components/Sidebar.vue'
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