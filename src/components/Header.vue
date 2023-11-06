<template>
    <div header class="w-20">
        <div class="home-link flex flex-col">
            <router-link to="/">
                <font-awesome-icon :icon="['fas', 'house']" />
            </router-link> 
            <router-link to="/about">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </router-link>
        </div>

        <div class="library-link">
            <font-awesome-icon :icon="['fas', 'bookmark']" />
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
</script>

<style lang="scss" scoped>
    [header] {
        .home-link {
            background-color: var(--color-background-soft);
            padding: 8px 12px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .library-link {
            background-color: var(--color-background-soft);
            padding: 8px 12px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>