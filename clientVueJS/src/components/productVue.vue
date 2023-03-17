 <!-- component CREE POUR LES BEST SELLERS, J'ai pas encore fait le carousel 
 et je fais l'affichage d'un Json vu que j'ai pas la base (CSS non définitif, oui il est degueu) -->


<script setup>
import { RouterLink, RouterView } from "vue-router"
</script>

<script>
    export default{
        props: {
            achats: []
        },
        data() {
            return {
            sortedAchats: [],
            selectedType: 'all',
            selectedPrice: 'all',
            selectedNote:'all'
            }
        },
        methods: {
            filterByTypePriceAndNote() {
                if (this.selectedType === 'all' && this.selectedPrice === 'all' && this.selectedNote === 'all') {
                    this.sortedAchats = [...this.achats];
                } else if (this.selectedType === 'all' && this.selectedPrice === 'all') {
                    this.sortedAchats = this.achats.filter(achat => achat.note === parseInt(this.selectedNote));
                } else if (this.selectedType === 'all' && this.selectedNote === 'all') {
                    this.sortedAchats = this.achats.filter(achat => achat.price <= parseFloat(this.selectedPrice));
                } else if (this.selectedPrice === 'all' && this.selectedNote === 'all') {
                    this.sortedAchats = this.achats.filter(achat => achat.type === this.selectedType);
                } else if (this.selectedType === 'all') {
                    this.sortedAchats = this.achats.filter(achat => achat.price <= parseFloat(this.selectedPrice) && achat.note >= parseInt(this.selectedNote));
                } else if (this.selectedPrice === 'all') {
                    this.sortedAchats = this.achats.filter(achat => achat.type === this.selectedType && achat.note >= parseInt(this.selectedNote));
                } else if (this.selectedNote === 'all') {
                    this.sortedAchats = this.achats.filter(achat => achat.type === this.selectedType && achat.price <= parseFloat(this.selectedPrice));
                } else {
                    this.sortedAchats = this.achats.filter(achat => achat.type === this.selectedType && achat.price <= parseFloat(this.selectedPrice) && achat.note >= parseInt(this.selectedNote));
                }
            }
        },
        created() {
            this.sortedAchats = [...this.achats];
        },
        watch: {
            selectedType() {
                this.filterByTypePriceAndNote();
            },
            selectedPrice(){
                this.filterByTypePriceAndNote();
            },
            selectedNote(){
                this.filterByTypePriceAndNote();
            }
        }
    }
</script>


<template>
    <div class="produits_titre">
        <div class="block_filtre">
            <h2>Trier par type</h2>
            <select v-model="selectedType">
                <option value="all">Tous les types</option>
                <option value="table">Table</option>
                <option value="chaise">Chaise</option>
                <option value="tabouret">Tabouret</option>
                <option value="canapé">Canapé</option>
            </select>
        </div>
        <div class="block_filtre">
            <h2>Trier par prix</h2>
            <select v-model="selectedPrice">
                <option value="all">Tous les prix</option>
                <option value="140">Moins de 150€</option>
                <option value="250">Moins de 250€</option>
                <option value="300">Moins de 300€</option>
                <option value="800">Moins de 800€</option>
            </select>
        </div>
        <div class="block_filtre">
            <h2>Trier par note</h2>
            <select v-model="selectedNote">
                <option value="all">Toutes les notes</option>
                <option value="1">1/5</option>
                <option value="2">2/5</option>
                <option value="3">3/5</option>
                <option value="4">4/5</option>
                <option value="5">5/5</option>
            </select>
        </div>
        
    </div>
    <div class="produits_container">
        <div v-for="achat in sortedAchats" :key="achat.id" class="Bien">
            <h1>{{ achat.price }}</h1>
            <h2>{{ achat.titre }}</h2>
            <h2>Collection : {{ achat.collection }}</h2>
            <h3>Note : {{ achat.note }}</h3>
            <h2>{{ achat.state }} </h2> 
            <p>{{ achat.info }}</p> 
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