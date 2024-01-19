<template>
    <main class="w-full h-full bg-dark px-[20px] pt-[65px] pb-5 rounded-lg relative z-20 overflow-auto scroll-custom">

    </main>
</template>

<script setup lang="ts">
    import { ref, onMounted, type Ref, inject, computed, onBeforeUpdate, provide, watchEffect, type ComputedRef, watch, nextTick, onBeforeUnmount } from 'vue'
    import { UserService } from '../services/api/userService'
    import { AuthService } from '../services/auth/authService'
    import { useRoute, useRouter } from 'vue-router'

    // router
    const router = useRouter();

    // llamar servicios
    const service = new UserService();
    const auth = new AuthService();

    //variables almacenamiento
    let news: Ref<any> = ref({});
    
    onMounted(async () => {

    });

</script>

<style lang="scss" scoped>     
    main {
        height: calc(100vh - 16px);
    }
</style>