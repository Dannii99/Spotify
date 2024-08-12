<template>
    <main class="w-full h-full bg-dark px-5 pt-16 pb-5 rounded-lg relative z-20 overflow-auto scroll-custom">
        <div class="banner absolute z-10 top-0 left-0 rounded-t-lg" :style="{ backgroundColor: colorRef }" /><!--  :style="{ backgroundColor: colorRef }" -->
        <section class="relative z-20 pt-6">
            <div class="grid gap-4 sm:gap-6 grid-cols-7">
                <div class="portada col-span-2">
                    <img v-if="playList?.images?.length" :src="playList?.images[0]?.url" crossorigin="anonymous" alt="image" class="img mt-auto" @load="handleLoad">
                </div>
                <div class="col-start-3 col-end-8 content-end">
                    <p class="text-xs sm:text-base color-title-opacity mb-3">Lista</p>
                    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold color-title mb-2">{{playList.name}}</h1>
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
        console.log('imageRef: ', imageRef.value);
        
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
         console.log('colorPalette: ', colorPalette.value);
         
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
                console.log('playList.value?.owner?.id: ', playList.value?.owner?.id);
                
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
    }
    .banner {
        height: 35rem;
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