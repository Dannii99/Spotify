<template>
    <main class="w-full h-full bg-dark px-5 pt-16 pb-5 rounded-lg relative z-20 overflow-auto scroll-custom">
        <div class="banner absolute z-10 top-0 left-0 rounded-t-lg" :style="{ backgroundColor: colorRef }" /><!--  :style="{ backgroundColor: colorRef }" -->
        <section class="relative z-20 pt-6 px-5 mb-[2em]">
            <div class="grid gap-4 sm:gap-6 grid-cols-7">
                <div class="portada col-span-2">
                    <img v-if="playList?.images?.length" :src="playList?.images[0]?.url" crossorigin="anonymous" alt="image" class="img mt-auto" @load="handleLoad">
                </div>
                <div class="col-start-3 col-end-8 content-end">
                    <p class="text-xs sm:text-base color-title-opacity mb-3">Lista</p>
                    <h1 class="text-xl sm:text-4xl md:text-5xl lg:text-7xl font-bold color-title mb-2">{{playList.name}}</h1>
                    <p v-if="playList?.images" class="text-xs sm:text-base color-title-opacity">{{ playList?.description }}</p>
                    <div class="flex w-full items-center">
                        <img v-if="playList?.images?.length" aria-hidden="false" draggable="false" :src="getProfileDiferent?.images[0]?.url" alt="image perfil" class="w-5 h-5 rounded-full mr-1 mb-auto">
                        <p class="text-xs sm:text-base color-title-opacity"> 
                            Hecha para <strong class="color-title"> {{ myProfile?.display_name }} </strong> • guardada {{ formatCurrency(playList?.followers?.total) }} 
                            veces • {{ formatCurrency(playList?.tracks?.total) }} {{ playList?.tracks?.total > 1 ? 'canciones' : 'cancion' }} 
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section class="pt-4 px-5 pb-[5rem] relative z-30">
            <div class="absolute top-0 left-0 w-full bg-[linear-gradient(180deg,_#0000000d_70%,_#121212_100%)] bg-[#0000000d] backdrop-blur-md z-10" />
            
            <div class="flex items-center relative z-20">
                <div class="rounded-full size-[4rem] bg-primary flex items-center justify-center cursor-pointer">
                    <font-awesome-icon :icon="['fas', 'play']" class="text-[1.125rem] dark" /> 
                </div>
                <font-awesome-icon :icon="['fas', 'circle-plus']" class="text-3xl gray-500 ms-6 cursor-pointer" /> 
                <font-awesome-icon :icon="['fas', 'circle-arrow-down']" class="text-3xl gray-500 ms-6 cursor-pointer" /> 
                <font-awesome-icon :icon="['fas', 'ellipsis']" class="text-3xl gray-500 ms-6 cursor-pointer" /> 
            </div>

            <div class="overflow-x-auto relative z-20 pt-6">
                <table class="w-full text-left text-white">
                    <thead>
                    <tr class="border-b border-white/20 text-base">
                        <th class="px-4 py-2 hidden sm:table-cell w-[1%]">#</th>
                        <th class="px-4 py-2">Título</th>
                        <th class="px-4 py-2 hidden lg:table-cell">Álbum</th>
                        <th class="px-4 py-2 hidden xl:table-cell">Fecha en la que se añadió</th>
                        <th class="px-4 py-2"><font-awesome-icon :icon="['fas', 'clock']" class="color-title" /> </th>
                    </tr>
                    </thead>
                    <tbody class="text-base">
                        <tr v-for="(item, index) in playList?.tracks?.items" :key="index">
                            <td class="px-4 py-2 hidden sm:table-cell">{{ index + 1 }}</td>
                            <td class="px-4 py-2">
                                <div class="flex items-center">
                                    <img aria-hidden="false" draggable="false" :src="item.track.album?.images[0]?.url" :alt="item.track.album.name" class="w-[2.5rem] h-[2.5rem] me-2">
                                    <div>
                                        <p class="truncate max-w-[6.875rem] sm:max-w-[9.375rem] md:max-w-[18.75rem]">{{ item.track.name }}</p>
                                        <p class="text-sm gray-600 flex truncate max-w-[6.875rem] sm:max-w-[9.375rem] md:max-w-[18.75rem]">
                                            {{ getArrArtist(item.track.album?.artists) }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-2 hidden lg:table-cell">
                                <p class="truncate max-w-[6.875rem] sm:max-w-[9.375rem] md:max-w-[18.75rem] text-sm gray-600"> {{ item.track.album.name }}</p>
                            </td>
                            <td class="px-4 py-2 truncate hidden xl:table-cell text-sm gray-600">{{ item.track.album.release_date }}</td>
                            <td class="px-4 py-2 truncate text-sm gray-600">{{ formattedTime(item.track.duration_ms) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    import { ref, onMounted, type Ref, inject, computed, onBeforeUpdate, provide, watchEffect, type ComputedRef, watch, nextTick, onBeforeUnmount } from 'vue'
    import { UserService } from '../services/api/userService'
    import { useRoute, useRouter } from 'vue-router'
    import { formatCurrency } from '@/utils/currency'

    // router
    const router = useRouter();
    const route = useRoute()

    // llamar servicios
    const service = new UserService();

    //variables almacenamiento
    let playList: Ref<any> = ref({});
    let myProfile: Ref<any> = ref({});
    let getProfileDiferent: Ref<any> = ref({});
    

    // Propiedad que recibirá del hijo
    const colorRef:Ref< string | ComputedRef<any> | any > = ref('');
    const colorPalette = ref<string[] | null>(null);
    const imageRef = ref< HTMLImageElement | null>(null);

    // Función que se ejecutará cuando el prop del hijo cambie
    const handleLoad = (event: Event) => {
        const image = event.target as HTMLImageElement;
        imageRef.value = image;
        //console.log('imageRef: ', imageRef.value);
        
        //color portada
        getColorPalette(imageRef.value);
    };

    const UpdateColor = (color: string) => {
        colorRef.value = color;
    };

    const getColorPalette = (image: HTMLImageElement) => {
        const canvas:any = document.createElement('canvas');
        canvas.crossOrigin = 'Anonymous';
        const ctx:any = canvas.getContext('2d');
        ctx.crossOrigin = 'Anonymous';
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, image.width, image.height);

        const imageData = ctx.getImageData(0, 0, image.width, image.height).data;
        const colors = calculateDominantColors(imageData, 5); // You can adjust the number of colors

         colorPalette.value = colors.map(color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
         //console.log('colorPalette: ', colorPalette.value);
         
         UpdateColor(colorPalette.value[0])
         //enviarPropPadre(colorPalette.value[0])
    };

    const calculateDominantColors = (imageData: Uint8ClampedArray, numColors: number): number[][] => {
        const colors: number[][] = [];
        for (let i = 0; i < numColors; i++) {
            const startIndex = i * 4;
            const color = [
                imageData[startIndex],
                imageData[startIndex + 1],
                imageData[startIndex + 2],
            ];
            colors.push(color);
        }
        return colors;
    };

    const formattedTime = (ms:number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const getArrArtist = (value:Array<any>) => {
        const artist = value.map(obj => obj.name).join(", ");
        return artist
    };

    
    onMounted(async () => {
        // console.log('route: ', route);
        if (route.params) {
            const id = route.params['playlist_id'];
        
            try {
                // Consumir el servicio getPlaylists
                playList.value = await service.getPlaylists(id);

                // Consumir el servicio getProfileMy
                myProfile.value = await service.getProfileMy();

                // Consumir el servicio getProfile usando el id del propietario de la playlist
                console.log('playList.value: ', playList.value.tracks.items);
                
                getProfileDiferent.value = await service.getProfile(playList.value?.owner?.id);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }

        }
        
        /* console.log('playList: ', playList.value);
        console.log('myProfile: ', myProfile.value);
        console.log('getProfileDiferent: ', getProfileDiferent.value); */
    });

</script>

<style lang="scss" scoped>     
    main {
        height: calc(100vh - 1rem);
        font-size: clamp(10px, 28px, 2vw);
    }
    .banner {
        height: 32em;
        width: 100%;
        background-color: var(--gray-700);
        background-image: linear-gradient(var(--color-linear-gradient) 0,var(--color-background-soft) 100%), url('../assets/img/bg-transparente.svg');
        -webkit-transition: background 1s ease;
        transition: background 1s ease;
    }

    .portada {
            background-color: var(--dark,#333);
            border-radius: 0.375rem;
            -webkit-box-shadow: 0 8px 24px rgba(0,0,0,.5);
            box-shadow: 0 8px 24px rgba(0,0,0,.5);
            padding-bottom: 100%;
            position: relative;
            width: 100%;
            height: 4em;
            overflow: hidden;
            & .img {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
</style>