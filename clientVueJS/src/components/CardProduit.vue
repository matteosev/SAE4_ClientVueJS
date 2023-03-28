<script>
export default {
    props: ['produit'],
    data() 
    {
        return {
            urlProduit: "/produit/" + this.produit.produitId
        };
    }
}
</script>

<template>
    <div class="Bien">
        <p>{{ produit.libelle }}</p>
        <a :href="urlProduit">Voir le produit</a>

    </div>
</template>

<style>
  .Bien{
          background-color: #dddddd;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 25vw;
          height: 30vh;
  }

  .Bien:hover{
    cursor: pointer;
  }
</style>