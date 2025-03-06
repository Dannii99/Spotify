/* Set up using Vue 3 */
import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from './router/index'
import './assets/main.scss'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHouse, faXmark, faMagnifyingGlass, faBookmark, faChevronLeft, faChevronRight, faUser, faPlay, faEllipsis, faCirclePlus, faCircleArrowDown, faClock } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'


const Icons = {
    faHouse,
    faXmark,
    faMagnifyingGlass,
    faBookmark,
    faSpotify,
    faChevronLeft,
    faChevronRight,
    faUser,
    faPlay,
    faEllipsis,
    faCirclePlus,
    faCircleArrowDown,
    faClock
}

/* add icons to the library */
library.add(Icons)

/* Crear y montar la instancia raíz. */
const app = createApp(App);

/* Asegurarse de usar la instancia del enrutador */
app.use(router)
app.use(store, key);


/* agregar libreria fontAwesome al compoent */
app.component('font-awesome-icon', FontAwesomeIcon)

/* montar */
app.mount('#app')


/* mode old */
/* createApp(App).mount('#app') */
