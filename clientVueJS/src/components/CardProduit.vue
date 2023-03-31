<script setup>
import axios from 'axios';
</script>

<script>
export default {
    props: ['produit'],
    data() 
    {
        return {
            urlProduit: "/produit/" + this.produit.produitId,
            variante: {},
            photos:[],
        };
    },
    created()
    {
        axios.get('https://localhost:7259/api/Variantes/GetAllVariantesByProduitIdAsync/' + this.produit.produitId)
        .then(response => 
        {
            //console.log(this.produit) // eslint-disable-line no-console
            this.variante = response.data[0]
            console.log(this.variante)
            axios.get('https://localhost:7259/api/Photos/GetPhotoByVariante/' + this.variante.varianteId).then(response => {this.photos = response.data ; console.log(this.photos[0])}).catch(error => console.error(error));
            //console.log(this.variantes) // eslint-disable-line no-console
            //console.log(this.selectedVariante) // eslint-disable-line no-console
        }
        ).catch(error => console.error(error));
    },
}
</script>

<template>
    <div class="Bien">
        <img v-if="photos.length > 0" :src="photos[0].chemin">
        <h2>{{ produit.libelle }}</h2>
        <h3>{{ this.variante.prix }}€</h3>
        <a :href="urlProduit">Voir le produit</a>

    </div>
</template>

<style>


  .Bien{
          display: flex;
          margin-bottom: 40px;
          flex-direction: column;
          align-items: center;
          width: 25vw;
          height: 30vh;
  }

  .Bien a:hover{
    cursor: pointer;
  }

  .Bien img{
    width:100%;
    height: 100%;
  }

  .Bien h3{
    margin-bottom: 10px;
  }

  .Bien a{
    text-decoration: none;
    color: var(--first-color);
    font-weight: bold;
  }
</style>