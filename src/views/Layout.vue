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
  import { useStore } from '@/store'
  import { useSpotifyPlayer } from '@/utils/loadSpotifySdk'

  // llamar servicios
  const service = new UserService();

  // llamar el SDK
  const { loadSpotifySdk, getDeviceID } = useSpotifyPlayer()
    
  // Acceder a la ruta (URL) actual
  const route = useRoute();
  const currentPath = ref(window.location.pathname);
  let perfil: Ref<any> = ref({});
  let player: Ref<any> = ref({});
  let state: Ref<any> = ref({});
  let deviceId: Ref<string> = ref('');
  let token = ref<string | null>(null)

  // store
  const store = useStore();
  

  onMounted(async () => {
    token.value = localStorage.getItem('access_token') || '';
    console.log('token:::: ', token.value);
    if (token.value) {
      await loadSpotifySdk(token.value)
    } else {
      console.warn('Token no disponible')
    }

    perfil.value = await service.getProfileMy();
    state.value = await service.getCurrentlyPlaying();
    const devices = await service.getMyDevices();
    const getDeviceId = getDeviceID();

    const matchedDevice = devices.devices.find((item:any) => item.id === getDeviceId);
    console.log('devices::::: ', devices);
    console.log('getDeviceId::::: ', getDeviceId);
    console.log('matchedDevice::::: ', matchedDevice.id);
    
    await store.dispatch('updateDevice', matchedDevice.id);
   /*  
      

      perfil.value = await service.getProfileMy();
      player.value = await service.putCurrentlyPlaying(devices.devices[0].id);
      state.value = await service.getPlayerState();

      */

      /* console.log('player: ', player);
      console.log('state: ', state); */
      
      
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