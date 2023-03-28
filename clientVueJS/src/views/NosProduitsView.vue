<script setup>  
import CardProduit from '../components/CardProduit.vue';
import Data from '../assets/json/achat.json';
import axios from 'axios';
</script>

<script>
   export default {
        data() {
            return {
            categories: [],
            categoriesParent:[],
            categoriesEnfant:[],
            produits: [],
            selectedCategory: null
            };
        },
        mounted() {
            this.getAllCategories();
            this.getAllProducts();
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

            getAllProducts() {
            axios.get('https://localhost:7259/api/Produits/GetAll')
            .then(response => {
                console.log(response.data)
                this.produits = response.data;
            })
            .catch(error => {
                console.error(error);
            });
            },

            getCategoriesEnfant(categorieParent){
            let categoriesEnfant = [];
            for(let categorie of this.categories){
                if(categorie.categorieParentId == categorieParent.categorieId ){
                categoriesEnfant.push(categorie);
                }
            }
            return categoriesEnfant;
            },

            selectCategory(category) {
            this.selectedCategory = category;
            this.getAllProducts();
            },

            filterProducts() {
            if (!this.selectedCategory) {
                return this.produits;
            }
            return this.produits.filter((produit) => {
                return produit.categorieId === this.selectedCategory.categorieId;
            });
            },
            
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
            <a @click="selectCategory(catEnfant)">{{ catEnfant.libelle }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  <div class="produits_container">

    <CardProduit v-for="produit in filterProducts()" :key="produit.produitId" :produit="produit"></CardProduit>

  </div>
</template>
  
<style>
main{
    height: 100vh;
}
.produits_titre{
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
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