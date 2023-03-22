<script setup>  
import axios from 'axios';
</script>

<script>
export default {
    props: ['id'],
    data() 
    {
        return {
            produit: {}
        };
    },
    mounted()
    {
        axios.get('https://localhost:7259/api/Produits/GetById/' + this.id).then(response => this.produit = response.data).catch(error => console.error(error));
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
    <main>
        <h1>{{ this.produit.libelle }}</h1>
        <p>{{  this.produit.description }}</p>
    </main>
</template>
  
<style>
</style>