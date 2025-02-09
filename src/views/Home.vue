<template>
    <main class="w-full h-full bg-dark px-5 pt-16 pb-5 rounded-lg relative z-20 overflow-auto scroll-custom">
        <div class="banner absolute z-10 top-0 left-0 rounded-t-lg" :style="{ backgroundColor: colorRef }" />
        <div class="relative z-20">
            <h1 class="text-[32px] font-bold"> {{ welcome }} </h1>
            <div v-if="Object.keys(album).length > 0">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 mb-8" >
                    <CardMini :album="item" :hoverColor="UpdateHoverColor" v-for="(item, index) in album.items" :key="index" /><!--  @hover-cambio="manejarHover" -->
                </div>
            </div>
            <div v-else>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 mb-8" >
                    <CardMini :skeleton="true" v-for="(item, index) in [1,2,3,4,5,6]" :key="index" />
                </div>
            </div>


            <section class="recentPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Escuchado recientemente</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getPlayListRecent(service?.IdUser, 0, 50), 'Escuchado recientemente')">Mostrar todos</a>
                    <!-- <router-link :to="{ name: 'more' }" @click.native.prevent="updateAndRedirect(service.getPlayListRecent(service?.IdUser, 0, 50))">   params: { id: false } ...recent?.items
                         Mostrar todos
                    </router-link> -->
                </div>

                <div v-if="Object.keys(recent).length > 0">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :playList="item" v-for="(item, index) in recent?.items" :key="index" />
                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :skeleton="true" v-for="(item, index) in ArraySkel" :key="index" />
                    </div>
                </div>
            </section>
            
           <!--  <section class="popularPlaylits"> // OBSOLETO
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">En tendencia</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getPlayListPopular(0, 50, 'CO'), 'En tendencia')">Mostrar todos</a>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <router-link :to="{ name: 'list', params: { playlist_id: item?.id } }" v-for="(item, index) in popular?.playlists?.items">
                        <Card :playList="item" :key="index" />
                    </router-link>
                </div>
            </section> -->

            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Novedades para ti</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getPlayListNews('CO', 0, 50), 'Novedades para ti')">Mostrar todos</a>
                </div>
                <div v-if="Object.keys(news).length > 0">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :playList="item" v-for="(item, index) in news?.albums?.items" :key="index" />
                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :skeleton="true" v-for="(item, index) in ArraySkel" :key="index" />
                    </div>
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Episodios</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getEpisodesUser('ES', 0, 50), 'Episodios')">Mostrar todos</a>
                </div>
                <div v-if="Object.keys(episodes).length > 0">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :playList="item" v-for="(item, index) in episodes?.items" :key="index" />
                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :skeleton="true" v-for="(item, index) in ArraySkel" :key="index" />
                    </div>
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Explorar</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getCategories('sv_CO', 0, 50), 'Explorar')">Mostrar todos</a>
                </div>
                <div v-if="Object.keys(category).length > 0">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :playList="item" v-for="(item, index) in category?.items" :key="index" />
                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :skeleton="true" v-for="(item, index) in ArraySkel" :key="index" />
                    </div>
                </div>
            </section>
            <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Tus Artistas</h2>
                    <a href="#" class="link" @click.prevent="updateAndRedirect(service.getMyArtists(0, 50), 'Tus Artistas')">Mostrar todos</a>
                </div>
                <div v-if="Object.keys(artist).length > 0">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :playList="item" v-for="(item, index) in  artist?.items" :key="index" />
                    </div>
                </div>
                <div v-else>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                        <Card :skeleton="true" v-for="(item, index) in ArraySkel" :key="index" />
                    </div>
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
    import debounce from 'lodash/debounce';

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
    let artist: Ref<any> = ref({});
    let category: Ref<any> = ref({});
    let episodes: Ref<any> = ref({});

     console.log('recent.value:: ', recent.value);
    
    
    let ArraySkel: Ref<any> = ref([1,2,3,4,5,6,7]);


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

    // Guarda el último rango detectado
    const lastRange = ref('');
    
    // Media Query Screem
    const checkMediaQueries = debounce(async () => {

        if (!controller.signal.aborted) {

            let newRange = '';
            if (window.matchMedia('(max-width: 639px)').matches) {
            newRange = 'mobile';
            } else if (window.matchMedia('(min-width: 639px) and (max-width: 767px)').matches) {
            newRange = 'mobileXL';
            } else if (window.matchMedia('(min-width: 767px) and (max-width: 1023px)').matches) {
            newRange = 'tablet';
            } else if (window.matchMedia('(min-width: 1023px) and (max-width: 1279px)').matches) {
            newRange = 'laptop';
            } else {
            newRange = 'desktop';
            }

            if (newRange !== lastRange.value) {
                if (newRange == 'mobile') {
                    columnNew.value = parseInt(columnActual.value) - 2;
                }else if (newRange == 'mobileXL') {
                    columnNew.value = parseInt(columnActual.value) - 1;
                }else if (newRange == 'tablet') {
                    columnNew.value = parseInt(columnActual.value);
                }else if (newRange == 'laptop') {
                    columnNew.value = parseInt(columnActual.value) + 1;
                }else if (newRange == 'desktop') {
                    columnNew.value = parseInt(columnActual.value) + 3;
                }
                root.style.setProperty('--column-count', columnNew.value.toString());
                generateArray(columnNew.value);
                
                [artist, recent, news, category, episodes].forEach(refVar => refVar.value = {});
                
                lastRange.value = newRange;
                await fetchData(newRange); // Solo llama a la API si el rango ha cambiado
            }
        }
    }, 300);

    const fetchData = async (range:string) => {
        //console.log(`Fetching data for ${range}`);
        switch (range) {
            case 'mobile':
            artist.value = await service.getMyArtists(0, 8);
            break;
            case 'mobileXL':
            artist.value = await service.getMyArtists(0, 9);
            break;
            case 'tablet':
            artist.value = await service.getMyArtists(0, 12);
            break;
            case 'laptop':
            artist.value = await service.getMyArtists(0, 15);
            break;
            case 'desktop':
            artist.value = await service.getMyArtists();
            break;
        }
        
        //popular.value = await service.getPlayListPopular(0, parseInt(columnNew.value), 'CO');
        recent.value = await service.getPlayListRecent(service?.IdUser, 0, parseInt(columnNew.value));
        news.value = await service.getPlayListNews('CO', 0, parseInt(columnNew.value));
        category.value = await service.getCategories('sv_CO', 7, parseInt(columnNew.value));
        category.value.items = addKeysToObject(category.value.items, 'type', 'category');
        episodes.value = await service.getEpisodesUser('ES', 3, parseInt(columnNew.value));
    };



    const updateAndRedirect = async (category:any, title: string) => {
      let newCategory = await category;
      newCategory = [{'title': title, items: (!!newCategory?.playlists) ? [...newCategory.playlists?.items] : (!!newCategory?.albums) ? [...newCategory.albums?.items] : [...newCategory?.items]}]
      // console.log('newCategory: ', newCategory);
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

    // contador de cartas a mostrar
    const generateArray = (column: number): any => {
        ArraySkel.value = Array.from({ length: column }, (_, i) => i + 1);
        //console.log('ArraySkel.value:": ",', ArraySkel.value);   
    }

    onBeforeUnmount(() => {
        checkMediaQueries();
    });
    
    onMounted(async () => {

        window.addEventListener('resize', checkMediaQueries); 

        // const category = await service.getCategories()
        await nextTick();
        // optener ultimos albunes escuchados del usuario
        tracks.value = await service.getMyTracks(0, 1);
        album.value = await service.getAlbum(0, 5);
        album.value.items.push({album: {'total_tracks': tracks.value.total, 'album_type': 'favorite', 'name': 'Canciones que te gustan', 'images': [{'url': like}]}});
        album.value.items.sort((a:any, b:any) => {
            return  b.album.total_tracks -  a.album.total_tracks;
        });
        
        
        // resize screem
        checkMediaQueries();

        
        // variable welcome define
        welcome.value = getGreeting();
        setInterval(() => {
            welcome.value = getGreeting();
        }, 60000); // Actualizar cada minuto
    });

    
    onUnmounted(() => {
      // Clean up the service when the component is destroyed
      // service.stop()
      window.removeEventListener('resize', checkMediaQueries); 
      controller.abort();
    })

</script>

<style lang="scss" scoped>
    div {
      color: var(--column-count);
    }
    
    main {
        height: calc(100vh - 1rem);
    }
    .banner {
        height: 20.75rem;
        width: 100%;
        background-color: var(--gray-700);
        background-image: linear-gradient(var(--color-linear-gradient) 0,var(--color-background-soft) 100%), url('../assets/img/bg-transparente.svg');
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