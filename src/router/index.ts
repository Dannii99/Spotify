// router.js
import { createRouter, createWebHistory } from 'vue-router';

// components
import Home from '../views/Home.vue';
import About from '../views/About.vue';

// definir objeto de rutas con sus componentes
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/',
    redirect: (to:any) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return 'home'
    },
  }
];

// Cree la instancia del enrutador
const router = createRouter({
  history: createWebHistory(),
  routes, // abreviatura de `routes: rutas`
});

export default router;