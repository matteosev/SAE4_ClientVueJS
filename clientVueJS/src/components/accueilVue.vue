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
          <h2 id="home_collections_texte">Miliboo propose plusieurs collections de meubles de haute qualité, allant des styles classiques aux designs modernes et contemporains, en utilisant des matériaux nobles, alliant à la fois fonctionnalité et esthétique.</h2>
        </div>
        <div class="home_collections_images">
          <img src="../assets/chaises.png" alt="">
        </div>
        <RouterLink id="home_collections_button" to="/produits">Découvrir nos produits</RouterLink>
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
  </template>





  
  <style scoped>
  
  main{ /*Je crée les différentes section du main*/
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
  }
  .home_container{
    position: relative;
  }
  
  #home_collections_button{
    position: absolute;
    top: 45%;
    right: 9%;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 40px;
    height: 40px;
    width: fit-content;
    color: var(--first-color);
    padding: 10px;
    border-radius: 9px;
    border: solid var(--first-color);
  }
  #home_collections_button:hover{
    background-color: var(--first-color);
    color: #FFF;
  }
  
  .home_titre   {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90vw;
    margin-left: 5vw;
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
  
  .home_collections_images img{
    max-width: 1080px;
  }


  </style>