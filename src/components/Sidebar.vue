<template>
    <div sidebar class="grid grid-rows-[112px_minmax(calc(100vh-150px),_1fr)] gap-4 w-[72px]">
        <div class="home-link flex flex-col">
            <router-link to="/home" class="nav-link">
                <font-awesome-icon :icon="['fas', 'house']" class="text-xl"/>
            </router-link> 
            <router-link to="/about" class="nav-link">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-xl" />
            </router-link>
        </div>

        <div class="library-link">
            <div class="library">
                <font-awesome-icon :icon="['fas', 'bookmark']" class="library-icon text-xl" />
            </div>
            <div class="group scroll-custom" v-if="album">
                <div class="grid grid-cols-1 gap-3">
                    <div class="icon" :style="{ backgroundImage: 'url(' + item.album.images[2].url + ')' }" v-for="(item, index) in album.items" :key="index"/>
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

    onMounted(async () => {
        album.value = await service.getAlbum();
       /*  console.log('album: ',  album.value); */
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
                padding: 8px 12px;
                overflow-y: auto;
                overflow-x: hidden;
                flex: 1 0 calc(100vh - 200px);
            }

            .icon {
                width: 48px;
                height: 48px;
                background-color: var(--black);
                background-position: center;
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