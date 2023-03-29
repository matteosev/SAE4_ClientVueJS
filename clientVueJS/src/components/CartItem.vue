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
        axios.get('https://localhost:7259/api/Produits/GetById/' + this.variante.produitId)
        .then(response => this.libelle = response.data.libelle)
        .catch(error => console.error(error));

        axios.get('https://localhost:7259/api/Variantes/GetAllVariantePhotosAsync/' + this.variante.varianteId)
        .then(response => this.photo = response.data[0].chemin)
        .catch(error => console.error(error));
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
            <button v-on:click="cartStore.deleteItem(variante)">Supprimer</button>
        </div>
    </div>
    
</template>

<style scoped>
* {
    font-family: 'Space-Grotesk-Bold';
}

.cartItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f5f5;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 1000px;
  }

.cartItem img {
  width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}

.container-overview {
  flex: 1;
  padding: 0 1rem;
}

.container-overview h1 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--first-color);
}

.container-overview p {
  font-size: 0.9rem;
  margin: 0.2rem 0;
}

.container-buttons {
  display: flex;
  flex-direction: column;
}

.container-buttons button {
  background-color: var(--first-color);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0.5rem 0;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.container-buttons button:hover {
  background-color: #5a5a5a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}
e

.checkout {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.buy-now-btn {
  align-self: center;
  background-color: var(--first-color);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.buy-now-btn:hover {
  background-color: #5a5a5a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}
</style>
