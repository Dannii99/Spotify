<template >
    <div class="card">
        <div class="imagen-content mb-3" :class="{'artist': lista?.value?.type == 'artist'}">
            <img v-if="lista?.value?.images" aria-hidden="false" draggable="false" loading="lazy" :src="lista?.value?.images[0]?.url" data-testid="card-image" alt="image" class="img-card">
            <img v-if="lista?.value?.episode?.images" aria-hidden="false" draggable="false" loading="lazy" :src="lista.value.episode.images[0]?.url" data-testid="card-image" alt="image" class="img-card">
            <img v-if="lista?.value?.icons" aria-hidden="false" draggable="false" loading="lazy" :src="lista?.value?.icons[0]?.url" data-testid="card-image" alt="image" class="img-card">
        </div>
        <div class="text-content">
            <h4 class="text-base font-bold color-title pb-1 line-clamp-title">{{ !!lista.value.name ? lista.value?.name : lista.value.episode?.name }}</h4>
            <p class="text-sm color-off-text line-clamp-text"  v-if="lista.value.description">{{ lista.value.description }}</p>
            <p class="text-sm color-off-text line-clamp-text" v-if="(!lista.value.description && lista.value.tracks)">{{ lista.value.tracks.total }} {{lista.value.tracks.total > 0 ? 'Canciones' : 'Cancion' }} </p>
            <p class="text-sm color-off-text line-clamp-text" v-if="(!lista.value.description && lista.value.total_tracks)">{{ lista.value.total_tracks }} {{lista.value.total_tracks > 0 ? 'Canciones' : 'Cancion' }}</p>
            <p class="text-sm color-off-text line-clamp-text" v-if="(lista?.value?.type == 'artist')">Artista</p>
            <p class="text-sm color-off-text line-clamp-text" v-if="(lista?.value?.type == 'category')">Categoria</p>
            <p class="text-sm color-off-text line-clamp-text" v-if="(lista.value.episode?.type == 'episode')">{{ lista.value.episode?.show.name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, type Ref, computed, watchEffect, provide, type SetupContext, getCurrentInstance } from 'vue';

     // variable para pasar info
     const props = defineProps<{
        playList?:any
    }>()

    // variable almacenamiento
    let lista: Ref<any | null> = ref(null);
    let episodes: Ref<any | null> = ref(null);
  
    watchEffect(() => {
        lista.value = computed(() => props.playList);
        //console.log('playListss=> ', lista.value);
        
        /* if (props.playList.episode) {
            episodes.value = computed(() => props.playList.episode);
            //console.log('episodess => ', episodes.value.value.images[0]?.url);
        } */
    });

    onMounted(() => {
    });
    
</script>

<style scoped lang="scss">
    .card {
        -webkit-box-flex: 1;
        background: var(--color-background-mute);
        border-radius: 0.5rem;
        -ms-flex: 1;
        flex: 1;
        isolation: isolate;
        padding: 1rem;
        position: relative;
        -webkit-transition: background-color .3s ease;
        transition: background-color .3s ease;
        width: 100%;
        cursor: pointer;
        &:hover {
            background: var(--color-background-mute-hover);
        }
        & .imagen-content {
            background-color: var(--dark,#333);
            border-radius: 0.375rem;
            -webkit-box-shadow: 0 8px 24px rgba(0,0,0,.5);
            box-shadow: 0 8px 24px rgba(0,0,0,.5);
            padding-bottom: 100%;
            position: relative;
            width: 100%;
            overflow: hidden;
            &.artist {
                border-radius: 6.25rem;
            }
            & .img-card {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        & .text-content {
            min-height: 3.875rem;
            & .line-clamp-title {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            & .line-clamp-text {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }
</style>