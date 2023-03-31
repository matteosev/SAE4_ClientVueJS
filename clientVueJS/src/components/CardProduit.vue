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
            axios.get('https://localhost:7259/api/Variantes/GetAllVariantePhotosAsync/' + this.variante.varianteId).then(response => {this.photos = response.data ; console.log(this.photos[0])}).catch(error => console.error(error));
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
        <div class="bandeau">
          <h2>{{ produit.libelle }}</h2>
          <h3>{{ this.variante.prix }}€</h3>
          <a :href="urlProduit">Voir le produit</a>
        </div>
        

    </div>
</template>

<style>


  .Bien{
          display: flex;
          margin-bottom: 40px;
          flex-direction: column;
          align-items: center;
          width: 25vw;
          height: fit-content;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          transition: 0.2s ease-in-out;
  }
  .Bien:hover{
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  .Bien a:hover{
    cursor: pointer;
  }

  .Bien img{
    width:100%;
    height: 100%;
    padding: 5%;
  }

  .Bien h2{
    display: flex;
text-align: center;
    margin-bottom: 10px;
  }

  .Bien a{
    text-decoration: none;
    color: white;
    font-weight: bold;
  }

  .bandeau{
    background-color:var(--first-colorV2);
    width: 100%;  
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bandeau h2{
    margin-top:5px;
  }

  .bandeau a{
    margin-bottom: 5px;
  }
</style>