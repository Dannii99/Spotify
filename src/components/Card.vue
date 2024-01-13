<template>
    <div class="card">
        <div class="imagen-content mb-3">
            <img aria-hidden="false" draggable="false" loading="lazy" :src="popular.value.images[0].url" data-testid="card-image" alt="" class="img-card" v-if="popular.value.images">
        </div>
        <div class="text-content">
            <h4 class="text-[16px] font-bold white pb-1">{{ popular.value.name }}</h4>
            <p class="text-[14px] gray-600">{{ popular.value.description }}</p>
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
    let popular: Ref<any | null> = ref(null);
  
    watchEffect(() => {
        popular.value = computed(() => props.playList);
       /*  console.log('popular: ',popular.value.value.images); */
    });

    onMounted(() => {
    });
    
</script>

<style scoped lang="scss">
    .card {
        -webkit-box-flex: 1;
        background: #181818;
        border-radius: 8px;
        -ms-flex: 1;
        flex: 1;
        isolation: isolate;
        padding: 16px;
        position: relative;
        -webkit-transition: background-color .3s ease;
        transition: background-color .3s ease;
        width: 100%;
        cursor: pointer;
        &:hover {
            background: #282828;
        }
        & .imagen-content {
            background-color: var(--dark,#333);
            border-radius: 6px;
            -webkit-box-shadow: 0 8px 24px rgba(0,0,0,.5);
            box-shadow: 0 8px 24px rgba(0,0,0,.5);
            padding-bottom: 100%;
            position: relative;
            width: 100%;
            overflow: hidden;
            & .img-card {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        & .text-content {
            min-height: 62px;
        }
    }
</style>