<template>
    <div>
        <h1>HOME</h1>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { UserService } from '../services/api/userService'

    const service = new UserService();
    onMounted(async () => {
    // se obtiene el token de la aplicacion por 1h
    const category = await service.getCategories()
    console.log('category: ', category);
    

  });

</script>

<style lang="scss" scoped>

</style>