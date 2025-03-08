<template>
    <div sidebar class="grid grid-rows-[112px_minmax(calc(100vh-150px),_1fr)] gap-4">
        <div class="home-link flex flex-col">
            <router-link to="/home" class="nav-link">
                <font-awesome-icon :icon="['fas', 'house']" class="text-xl"/>
            </router-link> 
            <router-link to="/category" class="nav-link">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-xl" />
            </router-link>
        </div>

        <div class="library-link">
            <div class="library">
                <font-awesome-icon :icon="['fas', 'bookmark']" class="library-icon text-xl cursor-pointer" />
            </div>
            <div class="group" v-if="album">
                <div class="list-group scroll-custom">
                    <div v-if="tabs.length > 0">
                        <div class="grid grid-cols-1 gap-3"> <!-- :style="{ backgroundImage: 'url(' +  item?.album?.images[2].url + ')'}"  v-for="(item, index) in tabs" :key="index" -->
                            <div class="icon cursor-pointer" :class="{'artist': (item?.type == 'artist') }" :style="{ backgroundImage: 'url(' +  ((item?.album) ?  item?.album?.images[0]?.url : item?.images[0]?.url) + ')'}"  v-for="(item, index) in tabs" :key="index" />
                        </div>
                    </div>
                    <div v-else>
                        <div class="grid grid-cols-1 gap-3">
                            <div class="icon cursor-pointer animate-pulse" v-for="(item, index) in skeleton" :key="index" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, type Ref } from 'vue';
    import { UserService } from '@/services/api/userService'

    // llamar servicios
    const service = new UserService();

    // variable almacenamiento
    let album: Ref<any | null> = ref(null);
    let artist: Ref<any | null> = ref(null);
    let playLists: Ref<any | null> = ref(null);
    let tabs: Ref<Array<any>> = ref([]);
    let skeleton: Ref<Array<any>> = ref([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,10]);

    onMounted(async () => {
        album.value = await service.getAlbum();
        artist.value = await service.getMyArtists();
        playLists.value = await service.getMyPlaylistsTop();

        tabs.value.push(...album?.value?.items, ...artist?.value?.items, ...playLists?.value?.items)

        // Organizar ascendentemente
        const sort = tabs.value.sort((a, b) => {
            const visitasA = a?.popularity || (a?.album && a?.album?.popularity) || (a?.tracks && a?.tracks?.total) || 0;
            const visitasB = b?.popularity || (b?.album && b?.album?.popularity) || (b?.tracks && b?.tracks?.total) || 0;
            return visitasB - visitasA;
        });
        //console.log('sort: ', sort);
    });

</script>

<style lang="scss" scoped>
    [sidebar] {
        width: 4.5rem;
        grid-template-rows: 7rem minmax(calc(100vh - 16.375rem), 1fr);
        .home-link {
            background-color: var(--color-background-soft);
            padding: 0.5rem 0.75rem;
            border-radius: 0.75rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .library-link {
            background-color: var(--color-background-soft);
           /*  padding: 8px 12px; */
            border-radius: 0.75rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            & .library {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.5rem 0.75rem;
                & .library-icon {
                    padding: 0.5rem;
                    color: var(--color-background-off);
                    &:hover,:focus {
                        color: var(--color-text);
                    }
                }
            }

            & .group {
                width: 100%;
                padding: 0.5rem 0 1.25rem;
                overflow: hidden;
                display: flex;
                flex: 1 0 calc(100vh - 19.5rem);
                & .list-group {
                    overflow:  hidden auto;
                    padding: 0 0.75rem;
                }
            }

            .icon {
                width: 3rem;
                height: 3rem;
                //background-color: var(--black);
                background-color: #4343438c;
                background-position: center;
                background-size: cover;
                &.artist {
                    border-radius: 6.25rem;
                }
            }
        }
        .nav-link {
            color: var(--color-background-off);
            &.router-link-active {
                color: var(--color-text);
            }
        }
    }
</style>