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
      <div>
        <p>{{ produit.libelle }}</p>
      </div>
      <div>
        <a v-bind:href="urlProduit">Voir le produit</a>
      </div>
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