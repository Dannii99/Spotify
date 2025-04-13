// src/composables/useSpotifyPlayer.ts
import {  ref, type Ref, toRefs  } from 'vue'
import { UserService } from '../services/api/userService'
import { useStore } from '@/store'



// llamar servicios
const service = new UserService();

const player = ref<any>(null)
const playing: Ref<any> = ref({});
const deviceid: Ref<string> = ref('');

// store
const store = useStore();

export function useSpotifyPlayer() {
  const loadSpotifySdk = (token: string) => {
    return new Promise<void>((resolve) => {
      // Define la función global antes de cargar el script
      ;(window as any).onSpotifyWebPlaybackSDKReady = () => {
        const Spotify = (window as any).Spotify

        player.value = new Spotify.Player({
          name: 'MUSIC SPOT',
          getOAuthToken: (cb: (token: string) => void) => {
            cb(token)
          },
          volume: 0.8
        })

        player.value.addListener('ready', async ({ device_id }: any) => {
          console.log('Dispositivo listo:', device_id)
          
          deviceid.value = device_id;
          //store.dispatch('updateDevice', device_id);
          //const store_device = store.store.device;console.log('store_device::::::::: ', store_device);
          
          playing.value = await service.putCurrentlyPlaying(device_id);
          //const devices = await service.getMyDevices();
        })

        player.value.connect().then(() => {
          resolve()
        })
      }

      // Agrega el script solo si no existe ya
      if (!document.getElementById('spotify-sdk')) {
        const script = document.createElement('script')
        script.id = 'spotify-sdk'
        script.src = 'https://sdk.scdn.co/spotify-player.js'
        script.async = true
        document.body.appendChild(script)
      } else {
        resolve()
      }
    })
  }
  const getDeviceID = () => {
    return deviceid.value
  }

  return {
    player,
    loadSpotifySdk,
    getDeviceID
  }
}