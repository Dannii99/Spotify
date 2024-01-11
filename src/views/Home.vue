<template>
    <div class="w-full h-full bg-dark px-[20px] pt-[65px] pb-5 rounded-lg">
        <div class="banner absolute z-10 top-0 left-0 rounded-t-lg" />
        <div class="relative z-20">
            <h1 class="text-[32px] font-bold"> {{ welcome }} </h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2" >
                <CardMini :album="item" v-for="(item, index) in album.items" :key="index" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, type Ref } from 'vue'
    import { UserService } from '../services/api/userService'
    import { AuthService } from '../services/auth/authService'
    import CardMini from './../components/CardMini.vue'

    // llamar servicios
    const service = new UserService();
    const auth = new AuthService();

    // valirable para el saludo al home
    let welcome: Ref<string> = ref('');
    const hour = new Date().getHours();
    
    const getGreeting = (): string => {
        if (hour >= 6 && hour < 12) {
            return '¡Buenos días!';
        } else if (hour >= 12 && hour < 18) {
            return '¡Buenas tardes!';
        } else {
            return '¡Buenas noches!';
        }
    }

    let album: Ref<any> = ref({});


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