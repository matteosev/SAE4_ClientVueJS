    <!-- component CREE POUR LES BEST SELLERS, J'ai pas encore fait le carousel 
    et je fais l'affichage d'un Json vu que j'ai pas la base (CSS non définitif, oui il est degueu) -->


    <script setup>
    import axios from 'axios';
    </script>

<script>
export default {
  data() {
    return {
      categories: [],
      categoriesParent:[],
      categoriesEnfant:[],
    };
  },
  mounted() {
    this.getAllCategories();
  },
  computed:{
    CategoriesParent(){
      let categoriesParent = [];
      for(let categorie of this.categories){
        if(categorie.categorieParentId==null){
          categoriesParent.push(categorie);
        }
      }
      return categoriesParent;
    }
  },
  methods: {
    getAllCategories() {
      axios.get('https://localhost:7259/api/Categories/GetAll')
      .then(response => {
        console.log(response.data)
        this.categories = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    getCategoriesEnfant(categorieParent){
      let categoriesEnfant = [];
      for(let categorie of this.categories){
        if(categorie.categorieParentId == categorieParent.categorieId){
          categoriesEnfant.push(categorie);
        }
      }
      return categoriesEnfant;
    }
  },
};
</script>




<template>
    <nav>
      <ul>
        <li class="deroulant" v-for="catParent in CategoriesParent" :key="catParent.categorieId">
          <a>{{ catParent.libelle }}</a>
          <ul class="sous">
            <li v-for="catEnfant in getCategoriesEnfant(catParent)" :key="catEnfant.categorieId">
              <a>{{ catEnfant.libelle }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </template>


    <style scoped>
    body{
        height: 100vh;
    }
    img{
        height: 10%;
    }
    nav{
        width: 100%;
        background-color: #fff;
        top: 0px;
    }

    nav ul{
        width: 92vw;
        display: flex;
        justify-content: space-around;
        
        
    }

    nav ul li{
        display: flex;
        width:fit-content;
        text-align: center;
        align-items: center;
        position: relative;
        margin: 12px;
    }

    nav ul::after{
        content:"";
        clear: both;
    }

    nav a{
        text-decoration: none;
        color: black;
        border-bottom: 2px solid transparent;
    }

    nav a:hover{
        color: var(--first-color);
        border-bottom: 2px solid rgb(1, 46, 0);
    }

    .sous{
        display: none;
        box-shadow: 0px 1px 2px #CCC;
        background-color: #fff;
        position: absolute;
        width: 200px;
        height: fit-content;
        top:100%;
        z-index: 1000;
    }

    nav > ul li:hover .sous{
        display: block;
    }

    .sous li{
        float: none;
        width: fit-content;
        text-align:left;
        cursor: pointer;
    }

    .sous li:hover{
        border-bottom: 1px solid rgb(1, 46, 0);
    }

    .sous a{
        padding:10px;
        border-bottom:none;
    }

    .sous a:hover{
        border-bottom: none;
        background-color: #fff;
    }

    
    .Bien{
        background-color: #dddddd;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25vw;
        padding: 5%;
        border-radius: 3%;
    }
    .Bien:hover{
        cursor: pointer;
    }

    .Bien p{
        text-align: center;
    }

    .produits_container{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;
        grid-auto-rows: minmax(10px, auto);
    }

    .produits_titre{
        display: flex;
        width: 100vw;
        align-items: center;
        justify-content: center;
    }

    .block_filtre{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;
        margin: 2vw;
    }

    @media (max-width: 1250px) { 
        .Bien{
        width: 40vw;
    }
    }

    @media (max-width: 915px) { 
        .Bien{
        width: 90vw;
    }
    }
    </style>