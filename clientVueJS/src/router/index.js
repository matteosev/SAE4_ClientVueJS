import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: AccueilView
    },
    
    {
      path: '/produits',
      name: 'produits',
      component: () => import('../views/ProduitsView.vue')
    },

    {
      path: '/collections',
      name: 'collections', //le nom etait "accueil ça bugait"
      component: () => import('../views/CollectionsView.vue')
    },

    {
      path: '/se-connecter',
      name: 'se-connecter',
      component: () => import('../views/SeConnecterView.vue')
    },

    {
      path: '/creer-compte',
      name: 'creer-compte',
      component: () => import('../views/CreerCompteView.vue')
    },

    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/ProfilView.vue')
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})
export default router
