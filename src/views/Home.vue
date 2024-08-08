<template>
    <main class="w-full h-full bg-dark px-5 pt-16 pb-5 rounded-lg relative z-20 overflow-auto scroll-custom">
        <div class="banner absolute z-10 top-0 left-0 rounded-t-lg" :style="{ backgroundColor: colorRef }" />
        <div class="relative z-20">
            <h1 class="text-[32px] font-bold"> {{ welcome }} </h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 mb-8" >
                <CardMini :album="item" :hoverColor="UpdateHoverColor" v-for="(item, index) in album.items" :key="index" /><!--  @hover-cambio="manejarHover" -->
            </div>


            <section class="recentPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Escuchado recientemente</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getPlayListRecent(service?.IdUser, 0, 50), 'Escuchado recientemente')">Mostrar todos</a>
                    <!-- <router-link :to="{ name: 'more' }" @click.native.prevent="updateAndRedirect(service.getPlayListRecent(service?.IdUser, 0, 50))">   params: { id: false } ...recent?.items
                         Mostrar todos
                    </router-link> -->
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in recent?.items" :key="index" />
                </div>
            </section>

            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">En tendencia</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getPlayListPopular(0, 50, 'CO'), 'En tendencia')">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in popular?.playlists?.items" :key="index" />
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Novedades para ti</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getPlayListNews('CO', 0, 50), 'Novedades para ti')">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in news?.albums?.items" :key="index" />
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Episodios</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getEpisodesUser('ES', 0, 50), 'Episodios')">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in episodes?.items" :key="index" />
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Explorar</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getCategories('sv_CO', 0, 50), 'Explorar')">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in category?.items" :key="index" />
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Tus Artistas</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getMyArtists(0, 50), 'Tus Artistas')">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in  artist?.items" :key="index" />
                </div>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref, onMounted, type Ref, inject, computed, onBeforeUpdate, provide, watchEffect, type ComputedRef, watch, nextTick, onBeforeUnmount, onUnmounted } from 'vue'
    import { useStore } from '@/store'
    import { UserService } from '../services/api/userService'
    import { AuthService } from '../services/auth/authService'
    import { useRoute, useRouter } from 'vue-router'
    import { addKeysToObject } from '.././utils/objectUtils';
    import like from '@/assets/img/liked-songs-640.png'
    import CardMini from '@/components/CardMini.vue'
    import Card from '@/components/Card.vue'

    // router
    const router = useRouter();

    // llamar servicios
    const service:any = new UserService();

    // const auth = new AuthService();

    // store
    const store = useStore();

    // controller
    const controller = new AbortController()
    const signal = controller.signal

    //variables almacenamiento
    let album: Ref<any> = ref({});
    let popular: Ref<any> = ref({});
    let tracks: Ref<any> = ref({});
    let recent: Ref<any> = ref({});
    let news: Ref<any> = ref({});
    let artist: Ref<any | null> = ref(null);
    let category: Ref<any> = ref({});
    let episodes: Ref<any> = ref({});

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
    const columnActual: Ref<any> = ref('4'); 
    const columnNew: Ref<any> = ref('');

    // screem Movil
    const isMobile: Ref<boolean> = ref(false);

    // screem Movil XL
    const isMobileXL: Ref<boolean> = ref(false);
    // screem tablet
    const isTablet: Ref<boolean> = ref(false);
    // screem tablet
    const isLaptop: Ref<boolean> = ref(false);
    // screem desktop
    const isDesktop: Ref<boolean> = ref(false);
    
    // Media Query Screem
    const checkMediaQueries = async () => {

        if (!controller.signal.aborted) {

            //columnActual.value = getComputedStyle(root).getPropertyValue('--column-count');
            const mobileQuery = window.matchMedia('(max-width: 640px)');
            const mobileXLQuery = window.matchMedia('(min-width: 640px) and (max-width: 768px)');
            const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
            const laptopQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1280px)');
            const desktopQuery = window.matchMedia('(min-width: 1280px)');
    
            isMobile.value = mobileQuery.matches;
            isMobileXL.value = mobileXLQuery.matches;
            isTablet.value = tabletQuery.matches;
            isLaptop.value = laptopQuery.matches;
            isDesktop.value = desktopQuery.matches;
    
            if (isMobile.value) {
                columnNew.value = parseInt(columnActual.value) - 2;
                root.style.setProperty('--column-count', columnNew.toString());
                artist.value = await service.getMyArtists(0, 8);
            }else if(isMobileXL.value) {
                columnNew.value =parseInt(columnActual.value) - 1;
                root.style.setProperty('--column-count', columnNew.toString());
                artist.value = await service.getMyArtists(0, 9);
            } else if(isTablet.value) {
                columnNew.value = parseInt(columnActual.value);
                root.style.setProperty('--column-count', columnNew.toString());
                artist.value = await service.getMyArtists(0, 12);
            } else if (isLaptop.value) {
                columnNew.value = parseInt(columnActual.value) + 1;
                root.style.setProperty('--column-count', columnNew.toString());
                artist.value = await service.getMyArtists(0, 15);
            } else if (isDesktop.value) {
                columnNew.value = parseInt(columnActual.value) + 3;
                root.style.setProperty('--column-count', columnNew.toString());
                artist.value = await service.getMyArtists();
            }
            //console.log('columnNew: ', columnNew.value);
            // optener playlist polulares
            popular.value = await service.getPlayListPopular(0, parseInt(columnNew.value), 'CO');
            recent.value = await service.getPlayListRecent(service?.IdUser, 0, parseInt(columnNew.value));
            news.value = await service.getPlayListNews('CO', 0, parseInt(columnNew.value));
            category.value = await service.getCategories('sv_CO', 7, parseInt(columnNew.value));
            category.value.items = addKeysToObject(category.value.items, 'type', 'category');
            episodes.value = await service.getEpisodesUser('ES', 0, parseInt(columnNew.value));
            
            console.log('recent: ', recent.value);
            // console.log('artist: ', artist.value);
            // console.log('category: ', category.value);
            // console.log('episodes: ', episodes.value);
            
        }
    };


    const updateAndRedirect = async (category:any, title: string) => {
      let newCategory = await category;
      newCategory = [{'title': title, items: (!!newCategory?.playlists) ? [...newCategory.playlists?.items] : (!!newCategory?.albums) ? [...newCategory.albums?.items] : [...newCategory?.items]}]
      console.log('newCategory: ', newCategory);
      await store.dispatch('updateAlbums', newCategory)
      router.push('/show-more') // Redirige a la nueva vista
    }

  

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
        checkMediaQueries();
    });
    
    onMounted(async () => {
        // const category = await service.getCategories()
        await nextTick();
        // optener ultimos albunes escuchados del usuario
        tracks.value = await service.getMyTracks(0, 1);
        album.value = await service.getAlbum(0, 5);
        album.value.items.push({album: {'total_tracks': tracks.value.total, 'album_type': 'favorite', 'name': 'Canciones que te gustan', 'images': [{'url': like}]}});
        album.value.items.sort((a:any, b:any) => {
            return  b.album.total_tracks -  a.album.total_tracks;
        });
        
        // console.log('album: ', album.value);
        // console.log('artist: ', artist.value);
        
        // resize screem
        checkMediaQueries();
        window.addEventListener('resize', checkMediaQueries); 

        
        // variable welcome define
        welcome.value = getGreeting();
        setInterval(() => {
            welcome.value = getGreeting();
        }, 60000); // Actualizar cada minuto
    });

    
    onUnmounted(() => {
      // Clean up the service when the component is destroyed
      // service.stop()
      controller.abort();
    })

</script>

<style lang="scss" scoped>
    
    div {
      color: var(--column-count);
    }
    
    main {
        height: calc(100vh - 16px);
    }
    .banner {
        height: 20.75rem;
        width: 100%;
        background-color: #535353;
        background-image: linear-gradient(var(--color-linear-gradient) 0,var(--color-background-soft) 100%),var(--background-noise);
        -webkit-transition: background 1s ease;
        transition: background 1s ease;
    }

    .head-playlits {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & .link {
            color: var(--color-background-off);
            white-space: nowrap;
            font-size: 0.875rem;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
                color: var(--gray-600);
            }
        }
    }
</style>