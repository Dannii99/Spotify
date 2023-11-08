// router.js
import { createRouter, createWebHistory } from 'vue-router';
import { AuthService } from './../services/auth/authService'
// components
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import Callback from '../views/Callback.vue';

// definir auh service
const auth = new AuthService();

// definir objeto de rutas con sus componentes
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, // Agrega la propiedad requiresAuth a meta
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { requiresAuth: true }, // Agrega la propiedad requiresAuth a meta
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    redirect: (to:any) => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return 'login'
    },
  }
];

// Cree la instancia del enrutador
const router = createRouter({
  history: createWebHistory(),
  routes, // abreviatura de `routes: rutas`
});


// Middleware para verificar el token de acceso y refrescarlo si es necesario
router.beforeEach(async (to, from, next) => {
 // console.log('to: ', to.meta);
 // await auth.getRefreshToken();
  if (to.meta.requiresAuth) {
    // Verifica si el token de acceso está caducado o no existe
    if (auth.getAccessToken() != null) {
      try {
        // Intenta refrescar el token de acceso
        await auth.getRefreshToken(); // Implementa la lógica para refrescar el token aquí
        next(); // Continúa con la navegación
      } catch (error) {
        // Maneja el error de refresco de token
        next({ name: 'home' }); // Redirige a la página de inicio de sesión
      }
    } else {
      next(); // Continúa con la navegación si el token de acceso es válido
    }
  } else {
    next(); // No se requiere autenticación, continúa con la navegación
  }
});

export default router;