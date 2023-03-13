<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/produits">Produits</RouterLink>
        <RouterLink to="/collections">Collections</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/se-connecter">Se Connecter</RouterLink>
        <RouterLink to="/creer-compte">Créer Un Compte</RouterLink>
        <RouterLink to="/profil">Créer Un Compte</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
