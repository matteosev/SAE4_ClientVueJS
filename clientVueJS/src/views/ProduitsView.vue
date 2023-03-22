<script setup>  
    import productItem from '../components/productVue.vue';
    import Data from '../assets/json/achat.json'

    
    
</script>

<template>
    <main>
        <div class="produits_titre">
            <h1>Nos Produits</h1>
        </div>
        <div >
            <productItem/>
        </div>
    </main>
</template>
  
<style>
.produits_titre{
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
    
</style>