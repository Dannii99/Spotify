<template>
    <header>
        <div class="history">
            <div class="navegate navegate-back me-2"><font-awesome-icon :icon="['fas', 'chevron-left']"/></div>
            <div class="navegate navegate-next"><font-awesome-icon :icon="['fas', 'chevron-right']"/></div>
        </div>
        <div class="content-user" v-if="user" v-on:click="close">
           <p class="color-title text-lg mb-0" >{{ user.value.display_name }}</p>
           <div class="flex justify-center items-center user ms-3" :style="{ backgroundImage: 'url(' + user.value.images[0].url + ')' }"  v-if="user.value?.images" />
           <div class="flex justify-center items-center user ms-3" v-if="user.value?.images?.length == 0 ? true : false" >
                <font-awesome-icon :icon="['fas', 'user']" class="text-sm color-title" /> 
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import router from '@/router';
    import { ref, onMounted, watch, type Ref, computed, watchEffect } from 'vue';

    const props = defineProps<{
        user?: any
    }>()
    
    let user: Ref<any | null> = ref(null); //computed(() => props.user)
        
    watchEffect(() => {
        user.value = computed(() => props.user);
        if (user.value.value.images) {
                // console.log('s: ', user.value.value.images.length);
                
        }
    })

    const close = () => {
        localStorage.clear();
        router.push('/login')
    }

    onMounted(() => {
    });
    
</script>

<style scoped lang="scss">
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem;
        transform: translate(0px, 0px);
        z-index: 30;
    }
    .content-user {
        display: flex;
        padding: 0.4rem 0.5rem 0.4rem 1rem;
        background-color: var(--color-background-box);
        align-items: center;
        border-radius: 6.25rem;
        cursor: pointer;
        & .user {
            width: 2.1875rem;
            height: 2.1875rem;
            background-color: var(--color-text);
            border-radius: 6.25rem;
            background-position: center;
        }
    }

    .history {
        display: flex;
        justify-content: center;
        align-items: center;
        & .navegate {
            width: 2.9375rem;
            height: 2.9375rem;
            background-color: var(--color-background-box);
            border-radius: 6.25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            cursor: pointer;

        } 
    }
</style>