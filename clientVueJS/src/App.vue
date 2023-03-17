<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
        <div class="home_logo">
          <img class="logo_miliboo"  src="./assets/logo.png" alt="">
        </div>

        <nav class="home_navigation">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">A Propos</RouterLink>
          <RouterLink to="/produits">Nos Produits</RouterLink>
          </nav>

        <div class="home_logs">
          <RouterLink to="/se-connecter">Se Connecter</RouterLink>
          <RouterLink to="/creer-compte">Créer Un Compte</RouterLink>
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
  width: 99;
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
