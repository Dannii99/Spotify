<template>
    <main main class="grid gap-4 p-2 grid-cols-custom">
      <Sidebar sidebar />
      <div content class="relative flex flex-col">
        <Header :user="perfil" />
        <router-view />
      </div>
      
      <Footer footer />
    </main>
</template>

<script setup lang="ts">
  import Header from './../components/Header.vue'
  import Footer from './../components/Footer.vue'
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
      perfil.value = await service.getProfileMy();
  });
  
  // Escuchar cambios en la ruta utilizando watch
  watch(() => route.path, (newPath, oldPath) => {
    currentPath.value = newPath;
    //console.log(currentPath.value);
    
  });

</script>

<style scoped lang="scss">
 .grid-cols-custom {
    // grid-template-columns: 4.5rem 1fr;
    display: grid;
    grid-template-columns: 4.5rem 1fr;
    grid-template-rows: auto minmax(0,5rem); /* El footer ocupa 3rem solo si está presente */
    grid-template-areas:
      "sidebar content"
      "footer footer";
    height: 100vh;
  }
  [sidebar] {
    grid-area: sidebar;
  }
  [content] {
    grid-area: content;
  }
  [footer] {
    grid-area: footer;
  }
</style>