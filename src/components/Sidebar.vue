<template>
    <div sidebar class="grid grid-rows-[112px_minmax(calc(100vh-150px),_1fr)] gap-4 w-[72px]">
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
                    <div class="grid grid-cols-1 gap-3"> <!-- :style="{ backgroundImage: 'url(' +  item?.album?.images[2].url + ')'}"  v-for="(item, index) in tabs" :key="index" -->
                        <div class="icon cursor-pointer" :class="{'artist': (item?.type == 'artist') }" :style="{ backgroundImage: 'url(' +  ((item?.album) ?  item?.album?.images[0]?.url : item?.images[0]?.url) + ')'}"  v-for="(item, index) in tabs" :key="index" />
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
        .home-link {
            background-color: var(--color-background-soft);
            padding: 8px 12px;
            border-radius: 12px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .library-link {
            background-color: var(--color-background-soft);
           /*  padding: 8px 12px; */
            border-radius: 12px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            & .library {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 8px 12px;
                & .library-icon {
                    padding: 0.5rem;
                    color: var(--gray-500);
                    &:hover,:focus {
                        color: var(--white);
                    }
                }
            }

            & .group {
                width: 100%;
                padding: 8px 0 20px;
                overflow: hidden;
                display: flex;
                flex: 1 0 calc(100vh - 200px);
                & .list-group {
                    overflow:  hidden auto;
                    padding: 0 12px;
                }
            }

            .icon {
                width: 48px;
                height: 48px;
                background-color: var(--black);
                background-position: center;
                background-size: cover;
                &.artist {
                    border-radius: 100px;
                }
            }
        }
        .nav-link {
            color: var(--gray-500);
            &.router-link-active {
                color: var(--white);
            }
        }
    }
</style>