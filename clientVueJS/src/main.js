// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useAuthStore } from './api/auth';
import { useCartStore } from './stores/cart';
import './assets/base.css';
import VueSweetAlert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(VueSweetAlert2);

// si l'utilisateur est connecté en ouvrant l'app, on récupère son panier dans la BD
if (useAuthStore().isAuthenticated)
    useCartStore().getCartFromDb(JSON.parse(localStorage.getItem("client")).clientId);

app.mount('#app');
