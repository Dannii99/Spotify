<template>
    <div class="w-full">
        <h1>HOME</h1>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { UserService } from '../services/api/userService'
    import { AuthService } from '../services/auth/authService'

    // llamar servicios
    const service = new UserService();
    const auth = new AuthService();
    
    onMounted(async () => {
        const category = await service.getCategories()
        const my = await service.getProfileMy()
        /* console.log('my: ', my);
        console.log('category: ', category); */
        
    });

</script>

<style lang="scss" scoped>

</style>