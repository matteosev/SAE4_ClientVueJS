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
            };
        },
        mounted() {
            this.getAllCategories();
        },
        computed:{
            CategoriesParent(){
                let categoriesParent = [];
                
                for(let categorie of this.categories){
                    console.log(categorie)
                    if(categorie.categorieParentId==null){
                        categoriesParent.push(categorie.libelle);
                    }
                }
                console.log(categoriesParent)
                return categoriesParent;
            }
        },
        methods: {
            getAllCategories() {
            axios.get('https://localhost:7259/api/Categories/GetAll')
                .then(response => {
                this.categories = response.data;
                })
                .catch(error => {
                console.error(error);
                });
            },
            
        },
    };
</script>




    <template>
        <div class="produits_titre">    
        </div>

        
        <div class="produits_container">
            <div  v-for="catParent in this.CategoriesParent" :key="catParent.categorieId"  class="Bien">
                <h1 >{{ catParent}}</h1>
                
            </div>
        </div>
        
    </template>
        

    <style scoped>
    img{
        height: 10%;
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