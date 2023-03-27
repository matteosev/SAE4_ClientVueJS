import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'

const routes = 
[
    {
      path: '/',
      name: 'accueil',
      component: AccueilView
    },
    
    {
      path: '/produits',
      name: 'produits',
      component: () => import('../views/NosProduitsView.vue')
    },

    {
      path: '/produit/:id',
      name: 'produit',
      props: true,
      component: () => import('../views/UnProduitView.vue')
    },

    {
      path: '/collections',
      name: 'collections', //le nom etait "accueil ça bugait"
      component: () => import('../views/CollectionsView.vue')
    },

    {
      path: '/se-connecter',
      name: 'se-connecter',
      component: () => import('../views/SeConnecterView.vue'),
      query: { redirectURL: encodeURIComponent("/") }
    },

    {
      path: '/creer-compte',
      name: 'creer-compte',
      component: () => import('../views/CreerCompteView.vue')
    },

    {
      path: '/panier',
      name: 'panier',
      component: () => import('../views/Cart.vue')
    },

      {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/profil',
      name:'profil',
      component: () => import('../views/Profil/ProfilUtilisateur.vue')
    },
    {
      path: '/updateGoogle',
      name:'updateGoogle',
      component: () => import('../views/UpdateAfterGoogle.vue')
    }
  ];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

import { createPinia } from 'pinia';
import { useAuthStore } from '../api/auth';

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const pinia = createPinia();
  const authStore = useAuthStore(pinia);
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/se-connecter');
  } else {
    next();
  }
});

export default router;