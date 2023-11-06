// router.js

import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';

// definir objeto de rutas con sus componentes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

// Cree la instancia del enrutador
const router = createRouter({
  history: createWebHistory(),
  routes, // abreviatura de `routes: rutas`
});

export default router;