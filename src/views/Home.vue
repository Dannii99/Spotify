<template>
    <main class="w-full h-full bg-dark px-[20px] pt-[65px] pb-5 rounded-lg relative z-20 overflow-auto scroll-custom">
        <div class="banner absolute z-10 top-0 left-0 rounded-t-lg" :style="{ backgroundColor: colorRef }" />
        <div class="relative z-20">
            <h1 class="text-[32px] font-bold"> {{ welcome }} </h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 mb-8" >
                <CardMini :album="item" :hoverColor="UpdateHoverColor" v-for="(item, index) in album.items" :key="index" /><!--  @hover-cambio="manejarHover" -->
            </div>
            <section class="recentPlaylits">
                <div class="head-playlits">
                    <h2 class="text-[24px] font-bold white">Escuchado recientemente</h2>
                    <a href="#" class="link">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in recent?.items" :key="index" />
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-[24px] font-bold white">En tendencia</h2>
                    <a href="#" class="link">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in popular?.playlists?.items" :key="index" />
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-[24px] font-bold white">Novedades para ti</h2>
                    <a href="#" class="link">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in news?.albums?.items" :key="index" />
                </div>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref, onMounted, type Ref, inject, computed, onBeforeUpdate, provide, watchEffect, type ComputedRef, watch, nextTick, onBeforeUnmount } from 'vue'
    import { UserService } from '../services/api/userService'
    import { AuthService } from '../services/auth/authService'
    import { useRoute, useRouter } from 'vue-router';
    import CardMini from '@/components/CardMini.vue'
    import Card from '@/components/Card.vue'

    // router
    const router = useRouter();

    // llamar servicios
    const service = new UserService();
    const auth = new AuthService();

    //variables almacenamiento
    let album: Ref<any> = ref({});
    let popular: Ref<any> = ref({});
    let recent: Ref<any> = ref({});
    let news: Ref<any> = ref({});

    // valirable para el saludo al home
    let welcome: Ref<string> = ref('');
    const hour = new Date().getHours();

    // Propiedad que recibirá del hijo
    const colorRef:Ref< string | ComputedRef<any> | any > = ref('');

    // Función que se ejecutará cuando el prop del hijo cambie
    const UpdateHoverColor = (color: string) => {
        colorRef.value = color;
    };

    // Accede al elemento root del documento
    const root = document.documentElement;

    // Acceder a la variable del root
    const columnActual: Ref<any> = ref(getComputedStyle(root).getPropertyValue('--column-count')); 
    const columnNew: Ref<any> = ref('');

    // screem Movil
    const isMobile: Ref<boolean> = ref(false);
    // screem tablet
    const isTablet: Ref<boolean> = ref(false);
    // screem tablet
    const isLaptop: Ref<boolean> = ref(false);
    // screem desktop
    const isDesktop: Ref<boolean> = ref(false);
    
    // Media Query Screem
    const checkMediaQueries = async () => {
        //console.log('columnActual: ', columnActual.value);
        
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
        const laptopQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1280px)');
        const desktopQuery = window.matchMedia('(min-width: 1280px)');

        isMobile.value = mobileQuery.matches;
        isTablet.value = tabletQuery.matches;
        isLaptop.value = laptopQuery.matches;
        isDesktop.value = desktopQuery.matches;

        if (isMobile.value) {
            columnNew.value = parseInt(columnActual.value) - 1;
            root.style.setProperty('--column-count', columnNew.toString());
        } else if(isTablet.value) {
            columnNew.value = parseInt(columnActual.value);
            root.style.setProperty('--column-count', columnNew.toString());
        } else if (isLaptop.value) {
            columnNew.value = parseInt(columnActual.value) + 1;
            root.style.setProperty('--column-count', columnNew.toString());
        } else if (isDesktop.value) {
            columnNew.value = parseInt(columnActual.value) + 3;
            root.style.setProperty('--column-count', columnNew.toString());
        }
        //console.log('columnNew: ', columnNew.value);
        // optener playlist polulares
        popular.value = await service.getPlayListPopular(0, parseInt(columnNew.value), 'CO');
        recent.value = await service.getPlayListRecent(service?.IdUser, 0, parseInt(columnNew.value));
        news.value = await service.getPlayListNews('CO', 0, parseInt(columnNew.value));
        //console.log('news: ', news.value);
        
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

    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkMediaQueries);
    });
    
    onMounted(async () => {
        // const category = await service.getCategories()
        await nextTick();
        // optener ultimos albunes escuchados del usuario
        album.value = await service.getAlbum(0, 6);
       
        // resize screem
        checkMediaQueries();
        window.addEventListener('resize', checkMediaQueries); 

        // variable welcome define
        welcome.value = getGreeting();
        setInterval(() => {
            welcome.value = getGreeting();
        }, 60000); // Actualizar cada minuto
    });

</script>

<style lang="scss" scoped>
    
    div {
      color: var(--column-count);
    }
    
    main {
        height: calc(100vh - 16px);
    }
    .banner {
        height: 332px;
        width: 100%;
        background-color: #535353;
        background-image: linear-gradient(#00000099 0,#121212 100%),var(--background-noise);
        -webkit-transition: background 1s ease;
        transition: background 1s ease;
    }

    .head-playlits {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & .link {
            color: var(--gray-500);
            white-space: nowrap;
            font-size: 14px;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
                color: var(--gray-600);
            }
        }
    }
</style>