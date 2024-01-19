<template>
    <div class="card cursor-pointer"  @mouseover="handleMouseOver" @mouseleave="ResetMouseOver" >
        <!-- <div class="icon" :style="{ backgroundImage: 'url(' + album.value.album.images[2].url + ')' }" v-if="album.value"/> -->
        <img ref="image" :src="album.value.album.images[0].url" alt="Sample Image" crossorigin="anonymous" class="icon"   @load="handleLoad" />
        <div class="content">
            <p class="text white">{{ album.value.album.name }}</p>
        </div>
    </div>
    <!-- <div v-if="colorPalette">
        <div v-for="(color, index) in colorPalette" :key="index" :style="{ backgroundColor: color }">
            {{ color }}
        </div>
    </div> -->
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, type Ref, computed, watchEffect, provide, type SetupContext, getCurrentInstance } from 'vue';

    // Obtener el contexto de setup manualmente
    const { emit }: { emit: (event: string, ...args: any[]) => void }  = getCurrentInstance()!;

    // variable para pasar info
    const props = defineProps<{
        album?: any,
        hoverColor?: any,
    }>()

    // variable almacenamiento
    let album: Ref<any | null> = ref(null);

    // Propiedad que será enviada al padre
    const colorRef: Ref<string> = ref('');
    const colorPalette = ref<string[] | null>(null);
    const imageRef = ref< HTMLImageElement | null>(null);
    

    // Función para enviar el prop al padre cuando hay hover
    const enviarPropPadre = (color: string) => {
        colorRef.value = color;
       // console.log(' colorRef: ',  colorRef.value);
        props.hoverColor(colorRef.value)
        //emit('hover-cambio', colorRef);
    };

    const handleMouseOver = () => {
        const image:any = imageRef.value;
        getColorPalette(image);
    };

    const ResetMouseOver = () => {
        colorPalette.value = [`rgb(24, 40, 56)`];
        enviarPropPadre(colorPalette.value[0])
    };

    const handleLoad = (event: Event) => {
        const image = event.target as HTMLImageElement;
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
         enviarPropPadre(colorPalette.value[0])
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

        
    watchEffect(() => {
        album.value = computed(() => props.album);
      //  console.log('album: ', album.value);
    });

    onMounted(() => {
    });
    
</script>

<style scoped lang="scss">
    .card {
        width: 100%;
        border-radius: 4px;
        height: 70px;
        background-color: hsl(0deg 0% 100% / 7%);
        display: flex;
        overflow: hidden;
        &:hover {
            background: hsla(0,0%,100%,.2);
        }
        & .icon {
            width: 70px;
            height: 70px;
            background-color: var(--black);
            background-position: center;
        }
        & .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            flex: 1 0 auto;
            width: calc(100% - 70px);
            & .text {
                font-size: 0.875rem;
                margin-bottom: 0;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-wrap: break-word;
                width: 100%;
            }
        }
    }
</style>