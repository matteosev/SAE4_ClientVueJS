<script setup>  
    import productItem from '../components/productVue.vue';
    import Data from '../assets/json/achat.json'

    
    
</script>

<template>
    <main>
        <div >
            <productItem/>
        </div>
        
    </main>
</template>
  
<style>
main{
    height: 100vh;
}
.produits_titre{
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
    
</style>