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
    background-color: var(--first-color);
    width: 25vw;
    padding: 10%;
    border-radius: 3%;
}
.Bien:hover{
    background-color: #a6a6a6de;
    cursor: pointer;
}

.Bien p{
    color: rgba(229, 160, 1, 1) ;
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