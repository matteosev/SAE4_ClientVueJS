 <!-- component CREE POUR LES BEST SELLERS, J'ai pas encore fait le carousel 
 et je fais l'affichage d'un Json vu que j'ai pas la base (CSS non définitif, oui il est degueu) -->


<script setup>
import { RouterLink, RouterView } from "vue-router"
</script>

<script >
    export default{
        props:{
            achats:[]
        }
    }
    // CODE DE TEST POUR LES FILTRES MAIS JE GALERE ZBI
    // actions:{    
    //         async fetchProducts(){
    //             const {$contentful} = useNuxtApp();
    //             const entries = await $contentful.GetEntries({
    //                 content_type:"product",
    //                 "fields.heatLevel": "Hot"
    //             });
    //             this.achats = entries.items;
    //             return this.achats
    //         },
    //         async fetchProduct(id){
    //             const {$contentful} = useNuxtApp();
    //             this.achat = await $contentful.GetEntry(id);
    //             return this.achat;
    //         },
    // }
</script>

<template>
    <div v-bind:key="achat.etat" v-for="achat in achats" class="Bien">
        <img v-bind:src=achat.photo alt="">
        <h1>{{ achat.price }}</h1>
        <h2>{{ achat.state }}</h2> 
        <p>{{ achat.info }}</p> 
     </div>
</template>


<style scoped>
img{
    height: 10%;
}
.Bien{
    background-color: var(--second-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25vw;
    padding: 5%;
    border-radius: 3%;
}
.Bien:hover{
    background-color: #a6a6a6de;
    cursor: pointer;
}

.Bien p{
    color: rgba(229, 160, 1, 1) ;
    text-align: center;
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