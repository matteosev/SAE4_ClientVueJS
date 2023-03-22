<script setup>
import axios from 'axios';
import CardProduit from '../components/CardProduit.vue';
</script>

<script>
export default {
    data() 
    {
        return {
            categories: [],
            categoriesParent:[],
            produits: []
        };
    },
    mounted()
    {
        axios.get('https://localhost:7259/api/Categories/GetAll').then(response => this.categories = response.data).catch(error => console.error(error));
        axios.get('https://localhost:7259/api/Produits/GetAll').then(response => this.produits = response.data).catch(error => console.error(error));
        console.log(this.produits)
    },
    computed:
    {
        CategoriesParent()
        {
            let categoriesParent = [];
                
            for(let categorie of this.categories){
                //console.log(categorie)
                if(categorie.categorieParentId==null){
                    categoriesParent.push(categorie.libelle);
                }
            }
            //console.log(categoriesParent)
            return categoriesParent;
        }
    },
    methods: 
    {
    }
}
</script>

<template>
    <main>
        <div class="produits_titre">    
        </div>
        
        <div class="produits_container">
            <div  v-for="catParent in this.CategoriesParent" :key="catParent.categorieId"  class="Bien">
                <h1 >{{ catParent}}</h1>
                
            </div>
        </div>

        <CardProduit v-for="produit in produits" :key="produit.produitId" :id="produit.produitId" :libelle="produit.libelle"/>

    </main>
</template>
  
<style>
.produits_titre{
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
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