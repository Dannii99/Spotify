<template>
    <div>
        <h1>ABOUT</h1>
        <button @click="count++">Count is: {{ count }}</button>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    const count = ref(0)
</script>

<style scoped>
    button {
    font-weight: bold;
    }
</style>