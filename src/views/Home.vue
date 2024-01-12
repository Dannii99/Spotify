<template>
    <div class="w-full h-full bg-dark px-[20px] pt-[65px] pb-5 rounded-lg">
        <div class="banner absolute z-10 top-0 left-0 rounded-t-lg" />
        <div class="relative z-20">
            <h1 class="text-[32px] font-bold"> {{ welcome }} </h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2" >
                <CardMini :album="item" v-for="(item, index) in album.items" :key="index" />
            </div>
        </div>

        <br><br><br><br><br><br><br><br>

        <div>
            <img ref="image" src="https://i.scdn.co/image/ab67616d0000b273f1aad814a40ec7419c234242" alt="Sample Image" crossorigin="anonymous" @load="handleLoad" @mouseover="handleMouseOver" />
          <!--   <img ref="image" src="https://www.safecreative.org/blog/es/wp-content/uploads/2022/10/derecho-de-autor-en-imagenes.jpg" alt="Sample Image" @load="handleLoad" @mouseover="handleMouseOver" /> -->
            <!-- <img ref="image" :src="arbol" alt="Sample Image" @load="handleLoad" @mouseover="handleMouseOver" /> -->
            <div v-if="colorPalette">
                <div v-for="(color, index) in colorPalette" :key="index" :style="{ backgroundColor: color }">
                    {{ color }}
            </div>
        </div>
  </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, type Ref } from 'vue'
    import { UserService } from '../services/api/userService'
    import { AuthService } from '../services/auth/authService'
    import { useRoute, useRouter } from 'vue-router';
    import CardMini from './../components/CardMini.vue'
    import arbol from "@/assets/img/bg-transparente.svg";

    // router
    const router = useRouter();

    // llamar servicios
    const service = new UserService();
    const auth = new AuthService();

    //variables almacenamiento
    let album: Ref<any> = ref({});

    // valirable para el saludo al home
    let welcome: Ref<string> = ref('');
    const hour = new Date().getHours();

    // color dominante
    const colorPalette = ref<string[] | null>(null);
    const imageRef = ref<HTMLImageElement | null>(null);

    // saludo
    const getGreeting = (): string => {
        if (hour >= 6 && hour < 12) {
            return '¡Buenos días!';
        } else if (hour >= 12 && hour < 18) {
            return '¡Buenas tardes!';
        } else {
            return '¡Buenas noches!';
        }
    }

    const handleMouseOver = () => {
        const image:any = imageRef.value;
        console.log("image: ", image);
        
        getColorPalette(image);
    };

    const handleLoad = (event: Event) => {
        const image = event.target as HTMLImageElement;
        console.log("image: ", image);
        imageRef.value = image;
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
        // const category = await service.getCategories()
        album.value = await service.getAlbum(0, 6);
        console.log('ALBUM: ', album.value);
        setTimeout(async () => {
            
        },500);
        
        welcome.value = getGreeting();
        setInterval(() => {
            welcome.value = getGreeting();
        }, 60000); // Actualizar cada minuto
    });

</script>

<style lang="scss" scoped>
    .banner {
        height: 332px;
        width: 100%;
        background-color: #535353;
        background-image: linear-gradient(#00000099 0,#121212 100%),var(--background-noise);
    }
</style>