<template>
  <header>
    <div class="home_logo">
      <img class="logo_miliboo" src="./assets/logo.png" alt="" />
    </div>

    <nav class="home_navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/produits">Nos Produits</RouterLink>
      <RouterLink v-if="!isConnected" to="/se-connecter">Se Connecter</RouterLink>
      <RouterLink v-if="!isConnected" to="/creer-compte">Créer Un Compte</RouterLink>
      <RouterLink v-if="isConnected" to="/profil">Profil</RouterLink>
      <RouterLink v-if="isConnected" @click="handleLogout" to="/">Déconnexion</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, provide, watchEffect } from 'vue';
import { useAuthStore } from './api/auth';

const authStoreInstance = useAuthStore();
const isConnected = ref(authStoreInstance.isAuthenticated);

// Mettre à jour la valeur isConnected en temps réel
watchEffect(() => {
  isConnected.value = authStoreInstance.isAuthenticated;
});

function handleLogout() {
  isConnected.value = false;
  authStoreInstance.logout(); // Appel de la méthode logout du store
}
</script>

<style scoped>
* {
  font-family: 'Space-Grotesk-Bold';
  overflow: hidden;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 99;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.logo_miliboo {
  max-width: 12vw;
  margin-left: 2vw;
}

.home_logs {
  margin-right: 2vw;
}

.logo_accounts {
  margin-right: 1vw;
  max-height: 5vh;
}

.home_navigation {
  display: flex;
  justify-content: space-between;
  width: 25vw;
  position: sticky;
  top: 0px;
}

.home_navigation a {
  text-decoration: none;
  color: var(--second-color);
}

.home_navigation a.router-link-exact-active {
  color: var(--first-color);
}

@media (max-width: 1250px) {
  .home_navigation {
    width: 75vw;

  }
}

@media (max-width: 915px) {
  .home_navigation {
    font-size: 0px;

  }
}
</style>
