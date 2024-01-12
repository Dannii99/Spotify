<template>
    <div>

    </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { AuthService } from './../services/auth/authService'
  // Importa el enrutador de Vue Router
  import { useRoute, useRouter } from 'vue-router';

  // Obtiene una referencia al enrutador
  const router:any = useRouter(); 
  
  // llamar servicios
   const auth = new AuthService();


  // Accede a la cadena de consulta (query string) de la URL
  const queryString = window.location.search;

  // Utiliza una función para analizar la cadena de consulta y obtener los valores de los parámetros
  const params = new URLSearchParams(queryString);

  // Obtén los valores de los parámetros "code" y "state"
  const code = params.get('code');
  const state = params.get('state');
  

  onMounted(async () => {
    // se obtiene el token de la aplicacion por 1h
    await auth.getToken(code);
    setTimeout(() => {
      router.push('/home')
    }, 100);
    
  });
</script>

<style scoped>

</style>