<script setup>  
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
</script>

<script>
export default {
    props: ['id'],
    data() 
    {
        return {
            produit: {},
            variantes: [],
            selectedVariante: {}
        };
    },
    mounted()
    {
        axios.get('https://localhost:7259/api/Produits/GetById/' + this.id).then(response => this.produit = response.data).catch(error => console.error(error));
        
        axios.get('https://localhost:7259/api/Variantes/GetAllVariantesByProduitIdAsync/' + this.id)
        .then(response => 
        {
            this.variantes = response.data
            this.selectedVariante = this.variantes[0];
            for (let variante of this.variantes)
                axios.get('https://localhost:7259/api/Variantes/GetAllVariantePhotosAsync/' + variante.varianteId).then(response => variante.photos = response.data).catch(error => console.error(error));
        }
        ).catch(error => console.error(error));
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
        <div id="container-overview">
            <swiper
                :modules="[Navigation, Pagination, Scrollbar, A11y]"
                :slides-per-view="1"
                :space-between="1"
                navigation
                :scrollbar="{ draggable: true }"
            >
                <swiper-slide v-for="photo of selectedVariante.photos" :key="photo.photoId">  <!--YA PLUS QU'A FAIRE UN V FOR AVEC LES BEST SELLER -->
                    <img :src="photo.chemin">
                </swiper-slide>
            </swiper>
            <div id="container-product-sidepane">
                <h1>{{ this.produit.libelle }}</h1>
                <p>Prix : {{ selectedVariante.prix }}€</p>
                <div id="container-product-colors">
                    <div v-for="variante of this.variantes" v-on:click="this.selectedVariante = variante;" :key="variante.varianteId" :style="{width:30 +'px', height:30 + 'px', backgroundColor:variante.couleurHexa}"></div>
                </div>
            </div>
        </div>

        <p>{{  this.produit.description }}</p>
        {{ this.selectedVariante }}
    </main>
</template>
  
<style>

#container-overview { display: flex; }

#container-overview .swiper {
    width: 70%;
    text-align: center;
}

#container-overview .swiper img { max-width: 80%; }

#container-overview #container-product-sidepane { width: 30%; }

#container-product-colors {
    background-color: aliceblue;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

#container-product-colors > div {
    cursor: pointer;
    transform: scale(1);
    transition-duration: 0.3s;
    transition-property: transform;
    transition-timing-function: ease-in-out;
}

#container-product-colors > div:hover { transform: scale(1.2); }

</style>