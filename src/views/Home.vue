<template>
    <div class="w-full h-full bg-dark px-[20px] pt-[65px] pb-5 rounded-lg">
        <div class="banner absolute z-10 top-0 left-0 rounded-t-lg" :style="{ backgroundColor: colorRef }" />
        <div class="relative z-20">
            <h1 class="text-[32px] font-bold"> {{ welcome }} </h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2" >
                <CardMini :album="item" :hoverColor="UpdateHoverColor" v-for="(item, index) in album.items" :key="index" /><!--  @hover-cambio="manejarHover" -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, type Ref, inject, computed, onBeforeUpdate, provide, watchEffect, type ComputedRef, watch } from 'vue'
    import { UserService } from '../services/api/userService'
    import { AuthService } from '../services/auth/authService'
    import { useRoute, useRouter } from 'vue-router';
    import CardMini from '@/components/CardMini.vue'

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

    // Propiedad que recibirá del hijo
    const colorRef:Ref< string | ComputedRef<any> | any > = ref('');

    // Función que se ejecutará cuando el prop del hijo cambie
    const UpdateHoverColor = (color: string) => {
        colorRef.value = color;
    };


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

    onBeforeUpdate(() => {

    });
    
    onMounted(async () => {
        // const category = await service.getCategories()
        album.value = await service.getAlbum(0, 6);
        // console.log('ALBUM: ', album.value);
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
        -webkit-transition: background 1s ease;
        transition: background 1s ease;
    }
</style>