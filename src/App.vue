<template>
  <main>
    <Header/>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
  import Header from './components/Header.vue'
  import { ref, onMounted } from 'vue'
  import { AuthService } from './services/auth/authService'

  const service = new AuthService();
  const clientId = service.getClientId();
  const clientSecret = service.getClientSecret();

  onMounted(async () => {
    // se obtiene el token de la aplicacion por 1h
    const token = await service.getToken(clientId, clientSecret);
  });


</script>

<style scoped>

</style>
