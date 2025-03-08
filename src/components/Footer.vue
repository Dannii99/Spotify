<template>
    <footer class="footer w-full h-full rounded-lg"><!--  bg-dark -->
        <div class="w-full text-white px-4 py-2 rounded-lg shadow-lg">
            <!-- Contenedor principal con grid de 3 columnas -->
            <div class="grid grid-cols-12 items-center gap-4">
                <!-- Sección izquierda: Información del disco (ocupa 2 columnas) -->
                <div class="col-span-3">
                    <div class="flex items-center space-x-3">
                        <img 
                            src="https://i.scdn.co/image/ab67616d0000b273ecb0880275a81f9d3cac224c" 
                            alt="Album cover" 
                            class="w-12 h-12 rounded"
                        />
                        <div class="truncate w-full">
                            <p class="font-medium truncate">Greedy</p>
                            <p class="text-gray-400 text-sm truncate">HARDAF</p>
                        </div>
                    </div>
                </div>
            
                <!-- Sección central: Controles de reproducción (ocupa 8 columnas) -->
                <div class="col-span-6">
                    <div class="flex flex-col items-center">
                        <!-- Botones de control -->
                        <div class="flex items-center space-x-4 mb-2">
                            <button class="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                                </svg>
                            </button>
                            <button class="bg-white text-gray-800 rounded-full p-2 hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <button class="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
                                </svg>
                            </button>
                        </div>
                    
                        <!-- Barra de progreso -->
                        <div class="w-full flex items-center space-x-2">
                            <span class="text-xs text-gray-400">1:23</span>
                            <div class="h-1 flex-grow bg-gray-600 rounded-full">
                                <div class="w-1/3 h-full bg-white rounded-full"></div>
                            </div>
                            <span class="text-xs text-gray-400">3:45</span>
                        </div>
                    </div>
                </div>
            
                <!-- Sección derecha: Control de volumen (ocupa 2 columnas) -->
                <div class="col-span-3">
                    <div class="flex items-center justify-end space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
                        </svg>
                        <div class="w-24 h-1 bg-gray-600 rounded-full">
                            <div class="w-1/2 h-full bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    import router from '@/router';
    import { ref, onMounted, watch, type Ref, computed, watchEffect } from 'vue';

    /* const props = defineProps<{
        
    }>() */
    

    onMounted(() => {
    });
    
</script>

<style scoped lang="scss">
    
</style>