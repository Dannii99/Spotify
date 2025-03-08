<template>
    <main class="main w-full h-full bg-dark px-5 pt-16 pb-5 rounded-lg relative z-20 overflow-auto scroll-custom">
        <div class="relative z-20 pt-20">
            <section class="recentPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">{{ category.title }}</h2>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in category.items" :key="index"  @click.prevent="redirect(item.id)" />
                </div>
            </section>

           <!--  <section class="popularPlaylits">
                <div class="head-playlits">
                    <h2 class="text-2xl font-bold color-title">Tus Artistas</h2>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pt-2 mb-8" >
                    <Card :playList="item" v-for="(item, index) in  artist?.items" :key="index" />
                </div>
            </section> -->
        </div>
    </main>
</template>

<script setup lang="ts">
    import { ref, onMounted, type Ref, inject, computed, onBeforeUpdate, provide, watchEffect, type ComputedRef, watch, nextTick, onBeforeUnmount } from 'vue'
    import { UserService } from '../services/api/userService'
    import { useStore } from '@/store'
    import { AuthService } from '../services/auth/authService'
    import { useRoute, useRouter } from 'vue-router'
    import { addKeysToObject } from '.././utils/objectUtils';
    import Card from '@/components/Card.vue'

    // router
    const router = useRouter();
    const route = useRoute()
    
    // llamar servicios
    //const service = new UserService();
    // const auth = new AuthService();
    
    //variables almacenamiento
    const items = route.params
    
    let category: Ref<any> = ref({});
    let artist: Ref<any | null> = ref(null);

    // store
    const store = useStore();


    // Accede al elemento root del documento
    const root = document.documentElement;

    const redirect = async (id: number) => {
      router.push(`/play-list/${id}`) // Redirige a la nueva vista
    }

    onBeforeUnmount(() => {
    
    });
    
    onMounted(async () => {
        category.value = store.state.albums[0];
        console.log('category: ',  category.value);
         
    });

</script>

<style lang="scss" scoped>
    
    div {
      color: var(--column-count);
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