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
            <font-awesome-icon :icon="['fas', 'bookmark']" class="library-icon text-xl" />
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';

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
            padding: 8px 12px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            & .library-icon {
                padding: 0.5rem;
                color: var(--gray-500);
                &:hover,:focus {
                    color: var(--white);
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