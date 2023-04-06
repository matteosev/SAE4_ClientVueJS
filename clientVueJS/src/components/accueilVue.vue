<script setup>
import { RouterLink, RouterView } from "vue-router"
import carouselBestSellers from '../components/carouselBestSellers.vue';
import carouselPromos from '../components/carouselPromosVue.vue';
</script>

<template>
<main>  

  <div class="home_container">
    <div class="home_titre">
      <h1 class="home_collections_titre">
        Miliboo
      </h1>
       </div>
    <div class="home_collections_images">
      <img src="../assets/chaises.png" alt="">
      <RouterLink id="home_collections_button" to="/produits"><span>Découvrir nos produits</span></RouterLink>
    </div>
    
  </div>
    

  <div class="home_container">
    <div class="home_titre">
      <h1 class="home_collections_titre">Nos best sellers</h1>
    </div>
    <carouselBestSellers></carouselBestSellers>
    </div>
   
  <div class="home_container">
    <div class="home_titre">
      <h1 class="home_collections_titre">Promotions</h1>
    </div>
    <carouselPromos></carouselPromos>
  </div>

</main>
<footer>
    <h2>Miliboo</h2>
    <h2 id="home_collections_texte">Miliboo propose plusieurs collections de meubles de haute qualité, allant des styles classiques aux designs modernes et contemporains, en utilisant des matériaux nobles, alliant à la fois fonctionnalité et esthétique.</h2>
    <h3>Maxence DUBOIS - Mattéo SEVERINI - Jérémy POULAIN - Timoté POLICET - Mathis SPORTIELLO</h3>
</footer>
</template>

<style scoped>
  
  main {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  height: 100%; /* add this line */
}
.home_container {
  position: relative; /* add this line */
}

#home_collections_button {
  margin-left: 9vw;
  border: none;
  display: block;
  text-align: center;
  text-decoration: none;
  display: flex;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 40px;
  height: 40px;
  width: fit-content;
  color: #FFF;
  background-color: var(--first-color);
  padding: 10px;
  border-radius: 9px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0,0,0,0.20);
}
#home_collections_button span {
  position: relative; 
  z-index: 1;
}
  
#home_collections_button:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 800%;
  width: 150%;
  background:#333;
  -webkit-transition: all .5s ease-in-out;
  transition: all .4s ease-in-out;
  -webkit-transform: translateX(-10%) translateY(-25%) rotate(45deg);
  transform: translateX(-70%) translateY(-25%) rotate(45deg);
}

#home_collections_button:hover:after {
  -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
  
  .home_titre {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80vw; /* reduce the width */
  margin: 0 auto; /* center the element */
}
  
  .home_collections_titre{
    width: fit-content;
    font-size: 113px;
    margin-right: 2vw;
    background: -webkit-linear-gradient(0.5turn, #333,var(--first-color)); /* Code pour la couleur dans le titre */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }


  #home_collections_texte{
    width:35vw;
    font-size: 19px;
    color: var(--second-color);
  }
  
  .home_collections_images  {
  width: 98vw;
  position: relative;
  height: fit-content;
}
.home_collections_images img {
  width: 85%;
}



  footer {
    display: flex;
    height: 30vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--first-color);
    color: white;
}


  </style>