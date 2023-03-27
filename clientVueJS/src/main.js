// main.js
import { createApp, watch } from 'vue';
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

watch(
    pinia.state,    // TODO : à chaque fois que le state change, on envoie le panier à la BD = PAS BESOIN DE LOCALSTORAGE
    (state) => { console.log(localStorage); localStorage.setItem("cartLines", JSON.stringify(useCartStore().lines)); },
    { deep: true });

app.mount('#app');
