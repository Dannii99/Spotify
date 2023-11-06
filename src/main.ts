import './assets/main.css'
import { createApp } from 'vue'
import router from './router';
import App from './App.vue'

// Crear y montar la instancia raíz.
const app = createApp(App);

// Asegurarse de usar la instancia del enrutador
app.use(router)

app.mount('#app')


// mode old
/* createApp(App).mount('#app') */
