<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
        <div class="home_logo">
          <img class="logo_miliboo" src="./assets/logo.png" alt="">
        </div>

        <nav class="home_navigation">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">A Propos</RouterLink>
          <RouterLink to="/collections"> Les Collections</RouterLink>
          <RouterLink to="/produits">Nos Produits</RouterLink>
          
          
         
        </nav>

        <div class="home_logs">
          <svg class="logo_accounts" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
          <!-- <RouterLink to="/se-connecter">Se Connecter</RouterLink>
          <RouterLink to="/creer-compte">Créer Un Compte</RouterLink>
          <RouterLink to="/profil">Créer Un Compte</RouterLink> -->
        </div>
  </header>

  <RouterView />
</template>

<style scoped>


*{
  font-family: 'Space-Grotesk-Bold';
  overflow: hidden  ;
}

header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  width: 100vw;
}
.logo_miliboo{
  max-width: 12vw;
  margin-left: 2vw;
}
.home_logs{margin-right: 2vw;}
.logo_accounts{
  margin-right: 1vw;
  max-height: 5vh;
}
.home_navigation{
  display: flex;
  justify-content: space-between;
  width:25vw;
}
.home_navigation a{
  text-decoration: none;
  color:var(--second-color) ;
}
.home_navigation a.router-link-exact-active {
  color: var(--first-color);
}

@media (max-width: 1250px) { 
  .home_navigation {
    width:40vw;
    
  }   
 }


 @media (max-width: 915px) { 
  .home_navigation {
    font-size: 0px;
    
  }
 }


</style>
