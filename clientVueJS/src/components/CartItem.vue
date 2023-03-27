<script setup>  
import axios from 'axios';
import { useCartStore } from '../stores/cart';
</script>

<script>

export default {
    props: ['variante', 'quantity'],
    data() 
    {
        return {
            cartStore: useCartStore(),
            libelle: "",
            photo: ""
        };
    },
    created()
    {
        console.log(this.cartStore.lines)
        axios.get('https://localhost:7259/api/Produits/GetById/' + this.variante.produitId).then(response => this.libelle = response.data.libelle).catch(error => console.error(error));
        axios.get('https://localhost:7259/api/Variantes/GetAllVariantePhotosAsync/' + this.variante.varianteId).then(response => this.photo = response.data[0].chemin).catch(error => console.error(error));
    },
    mounted()
    {
    },
    computed:
    {
    },
    methods: 
    {
    }
}
</script>

<template>
    <div class="cartItem">
        <img :src="photo">
        <div class="container-overview">
            <h1>{{ libelle }}</h1>
            <p>Prix unitaire : {{ variante.prix }}€</p>
            <p>Quantité dans le panier : {{ quantity }}</p>
            <p>Prix total : {{ quantity * variante.prix }}€</p>
        </div>
        <div class="container-buttons">
            <button v-on:click="this.$router.push({ path: '/produit/' + variante.produitId });">Voir le Produit</button>
            <button v-on:click="cartStore.deleteLine(cartStore.findLineId(variante.varianteId))">Supprimer</button>
        </div>
    </div>
</template>

<style scoped>

.cartItem{
    margin: 10px;
    display: flex;
    width: calc(100% - 20px);
}

.cartItem > img{
    width: 30%;
}

.cartItem > .container-overview{
    width: 50%;
}

.cartItem > .container-buttons{
    width: 20%;
    display: flex;
    flex-direction: column;
}

.cartItem > .container-buttons > button{
    height: 50%;
}
</style>