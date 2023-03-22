<script setup>  
import axios from 'axios';
</script>

<script>
export default {
    props: ['id'],
    data() 
    {
        return {

        };
    },
    mounted()
    {
        axios.get('https://localhost:7259/api/Produits/GetById/' + this.id)
        .then(response => 
        {
            this.produits = response.data;
            console.log(this.produits)
        })
        .catch(error => {
            console.error(error);
        });
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

    </main>
</template>
  
<style>
</style>