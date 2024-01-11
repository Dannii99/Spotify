<template>
    <main class=" grid gap-4 p-2 grid-cols-custom">
      <Sidebar />
      <div class="relative">
        <Header :user="perfil" />
        <router-view />
      </div>
    </main>
</template>

<script setup lang="ts">
  import Header from './../components/Header.vue'
  import Sidebar from './../components/Sidebar.vue'
  import { UserService } from '../services/api/userService'
  import { ref, onMounted, watch, type Ref, toRefs } from 'vue';
  import { useRoute } from 'vue-router';

  // llamar servicios
  const service = new UserService();
    
  // Acceder a la ruta (URL) actual
  const route = useRoute();
  const currentPath = ref(window.location.pathname);
  let perfil: Ref<any> = ref({});
  
  onMounted(async () => {
    setTimeout(async () => {
      perfil.value = await service.getProfileMy();
    },500);
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