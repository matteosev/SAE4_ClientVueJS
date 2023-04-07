<script setup>
import CardProduit from '../components/CardProduit.vue';
import Loader from '../components/LoaderVue.vue';
import axios from '../api/axios.js';
</script>

<script>

export default {
    data() {
        return {
            categories: [],
            categoriesParent: [],
            categoriesEnfant: [],
            produits: [],
            selectedCategory: null,
            prix1: null,
            prix2: null,
        };
    },
    mounted() {
        this.getAllCategories();
        this.getAllProducts();
    },
    computed: {
        CategoriesParent() {
            let categoriesParent = [];
            for (let categorie of this.categories) {
                if (categorie.categorieParentId == null) {
                    categoriesParent.push(categorie);
                }
            }
            return categoriesParent;
        }
    },
    methods: {
        getAllCategories() {
            axios.get('/api/Categories/GetAll')
                .then(response => {
                    console.log(response.data)
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },

        getAllProducts() {
            axios.get('/api/Produits/GetAll')
                .then(response => {
                    console.log(response.data)
                    this.produits = response.data;

                })
                .catch(error => {
                    console.error(error);
                });
        },

        getAllProduitsByCatParent(categorieParentId) {
            axios.get('/api/Produits/GetAllProduitsByCategorieParent/' + categorieParentId)
                .then(response => {
                    console.log(response.data);
                    this.produits = response.data;
                })
                .catch(error => {
                    console.error(error);
                })
        },

        getCategoriesEnfant(categorieParent) {
            let categoriesEnfant = [];
            for (let categorie of this.categories) {
                if (categorie.categorieParentId == categorieParent.categorieId) {
                    categoriesEnfant.push(categorie);
                }
            }
            return categoriesEnfant;
        },

        async getProduitsByPrice() {
            const response = await axios.get(`/api/Produits/GetProduitsWherePrixEntre/${this.prix1}/${this.prix2}`);
            this.produits = response.data;
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
    components: { Loader, CardProduit }
};
</script>

<template>
    <nav>
        <ul>
            <li class="deroulant" v-for="catParent in CategoriesParent" :key="catParent.categorieId">
                <a @click="getAllProduitsByCatParent(catParent.categorieId)">{{ catParent.libelle }}</a>

                <ul class="sous">
                    <li v-for="catEnfant in getCategoriesEnfant(catParent)" :key="catEnfant.categorieId">
                        <a @click="selectCategory(catEnfant)">{{ catEnfant.libelle }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
    <div class="filtres">
        <h1>Filtrer par prix</h1>
        <div>
            <div>
                <label for="prix1">Prix minimum</label>
                <input type="number" id="prix1" v-model="prix1">
            </div>
            <div>
                <label for="prix2">Prix maximum</label>
                <input type="number" id="prix2" v-model="prix2">
            </div>
        </div>
        <div>
            <button id="apply_filtre" @click="getProduitsByPrice">Rechercher</button>
        </div>

    </div>

    <div class="container_central">
        <div class="produits_container">
            <CardProduit v-for="produit in filterProducts()" :key="produit.produitId" :produit="produit"></CardProduit>
        </div>
    </div>
</template>
  
<style>
template {
    overflow: hidden;
}

main {
    height: 100vh;
}

.produits_titre {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
    font-size: 40px;
}

body {
    height: 100vh;
}

img {
    height: 10%;
}

nav {
    width: 100%;
    background-color: #fff;
    top: 0px;
}

nav ul {
    width: 98vw;
    display: flex;
    justify-content: space-around;
}

nav ul li {
    display: flex;
    width: fit-content;
    text-align: center;
    align-items: center;
    position: relative;
    margin: 12px;
}

nav ul::after {
    content: "";
    clear: both;
}

nav a {
    text-decoration: none;
    color: black;
    border-bottom: 2px solid transparent;
    cursor: pointer;
}

nav a:hover {
    color: var(--first-color);
    border-bottom: 2px solid rgb(1, 46, 0);
}

.sous {
    display: none;
    box-shadow: 0px 1px 2px #CCC;
    background-color: #fff;
    position: absolute;
    width: 200px;
    height: fit-content;
    top: 100%;
    z-index: 1000;
}

nav>ul li:hover .sous {
    display: block;
}

.sous li {
    float: none;
    width: fit-content;
    text-align: left;
    cursor: pointer;
}

.sous li:hover {
    border-bottom: 1px solid rgb(1, 46, 0);
}

.sous a {
    padding: 10px;
    border-bottom: none;
}

.sous a:hover {
    border-bottom: none;
    background-color: #fff;
}

.container_central {
    margin-top: 4vh;
    display: flex;
    align-items: center;
    justify-content: center;
}


.produits_container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 8.3vw;
    grid-row-gap: 1vw;
    grid-auto-rows: minmax(10px, auto);
}

.produits_titre {
    display: flex;
    width: 100vw;
    align-items: center;
    justify-content: center;
}

.block_filtre {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: 2vw;
}

@media (max-width: 1250px) {
    .Bien {
        width: 40vw;
    }
}

@media (max-width: 915px) {
    .Bien {
        width: 90vw;
    }
}

.filtres div {
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
    padding: 5px;
}

.filtres div div {
    display: flex;
}

label {
    margin-right: 10px;
}

.filtres {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    background-color: var(--first-color);
    color: white;
    padding: 3px;
    border: solid 2px #FFF;
}

button:hover {
    background-color: #fff;
    color: var(--first-color);
    border: solid 2px var(--first-color);
    cursor: pointer;
}

input {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #f2f2f2;
    font-size: 16px;
    color: #333;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    box-shadow: 0px 0px 10px var(--first-color);
    background-color: #fff;
}

label {
    font-weight: bold;
}</style>