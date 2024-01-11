<template>
    <div class="card">
        <div class="icon" :style="{ backgroundImage: 'url(' + album.value.album.images[2].url + ')' }" v-if="album.value"/>
        <div class="content">
            <p class="text white">{{ album.value.album.name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, type Ref, computed, watchEffect } from 'vue';

    const props = defineProps<{
        album?: any
    }>()

    let album: Ref<any | null> = ref(null); //computed(() => props.user)
        
    watchEffect(() => {
        album.value = computed(() => props.album);
        console.log('album: ', album.value);
    });

    onMounted(() => {
    });
    
</script>

<style scoped lang="scss">
    .card {
        width: 100%;
        border-radius: 4px;
        height: 48px;
        background-color: hsl(0deg 0% 100% / 7%);
        display: flex;
        overflow: hidden;
        & .icon {
            width: 48px;
            height: 48px;
            background-color: var(--black);
            background-position: center;
        }
        & .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem;
            flex: 1 0 auto;
            & text {
                font-size: 0.875rem;
                margin-bottom: 0;
            }
        }
    }
</style>