<script>
import axios from 'axios';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useAuthStore } from '../api/auth';
import { useCartStore } from '../stores/cart';

export default {
    props: ['id'],
    data() {
        return {
            authStore: useAuthStore(),
            cartStore: useCartStore(),
            produit: {},
            variantes: [],
            selectedVariante: {},
            quantity: 1
        };
    },
    created() {
        axios.get('https://localhost:7259/api/Produits/GetById/' + this.id).then(response => this.produit = response.data).catch(error => console.error(error));

        axios.get('https://localhost:7259/api/Variantes/GetAllVariantesByProduitIdAsync/' + this.id)
            .then(response => {
                //console.log(this.produit) // eslint-disable-line no-console
                this.variantes = response.data
                this.selectedVariante = this.variantes[0];
                for (let variante of this.variantes)
                    axios.get('https://localhost:7259/api/Variantes/GetAllVariantePhotosAsync/' + variante.varianteId).then(response => variante.photos = response.data).catch(error => console.error(error));
                //console.log(this.variantes) // eslint-disable-line no-console
                //console.log(this.selectedVariante) // eslint-disable-line no-console
            }
            ).catch(error => console.error(error));
    },
    mounted() {
    },
    computed:
    {
    },
    methods:
    {
        colorClickHandler(event, newSelectedVariante) {
            this.selectedVariante = newSelectedVariante;
            for (let divColor of event.target.parentNode.children)
                divColor.style.borderRadius = ""
            event.target.style.borderRadius = "100%"
        },
        addToCart(event) {
            if (!this.authStore.isAuthenticated)
                this.$router.push({ path: '/se-connecter', query: { redirectURL: encodeURIComponent('/produit/' + this.id) } });
            else
                this.cartStore.addItem(this.selectedVariante, this.quantity);
        }
    }
}
</script>

<template>
    <main>
        <!-- Aperçu du produit en vente -->
        <section style="display: flex;">

            <div id="product-col-1">

                <swiper :modules="[Navigation]" :slides-per-view="1" :space-between="1" navigation>
                    <swiper-slide v-for="photo of selectedVariante.photos" :key="photo.photoId">
                        <img :src="photo.chemin">
                    </swiper-slide>
                </swiper>

                <div id="product-text">
                    <h2>Description</h2>
                    <p style="text-align: justify;">{{ this.produit.description }}</p>
                    <h2>Entretien</h2>
                    <p style="text-align: justify;">{{ this.produit.instructionsEntretien }}</p>
                    <h2>Fiche Technique</h2>
                    <p v-if="this.produit.matiere != null && this.produit.matiere != ''">Matière : {{ this.produit.matiere
                    }}</p>
                    <p v-if="this.produit.revetement != null && this.produit.revetement != ''">Revêtement : {{
                        this.produit.revetement }}</p>
                    <p v-if="this.produit.poidsColis != null && this.produit.poidsColis != ''">Poids du colis : {{
                        this.produit.poidsColis }}</p>
                    <p v-if="this.produit.dimensionsTotale != null && this.produit.dimensionsTotale != ''">Dimensions du
                        produit : {{ this.produit.dimensionsTotale }}</p>
                    <p v-if="this.produit.dimensionsColis != null && this.produit.dimensionsColis != ''">Dimensions du colis
                        : {{ this.produit.dimensionsColis }}</p>
                </div>

            </div>

            <div id="product-col-2">

                <div id="sidepane">
                    <h1>{{ this.produit.libelle }}</h1>
                    <p v-if="this.selectedVariante.stock >= 10">En stock</p>
                    <p v-else-if="this.selectedVariante.stock < 10 && this.selectedVariante.stock > 0">Presque en rupture !
                        Stock restant : {{ this.selectedVariante.stock }}</p>
                    <p v-else style="color: red">En rupture</p>
                    <p>Prix : {{ selectedVariante.prix }}€</p>

                    <div id="container-colors" v-if="this.variantes.length > 1">
                        <div v-for="variante of this.variantes" v-on:click="$event => colorClickHandler($event, variante)"
                            :key="variante.varianteId"
                            :style="{ width: 30 + 'px', height: 30 + 'px', backgroundColor: variante.couleurHexa }"></div>
                    </div>

                    <!-- Call To Action -->
                    <div id="container-buy">
                        <input type="number" min="0" v-model="quantity">
                        <div id="container-quantity">
                            <button v-on:click="$event => this.quantity += 1">+</button>
                            <button v-on:click="$event => (this.quantity - 1 > 0) ? this.quantity -= 1 : 0">-</button>
                        </div>
                        <div style="width: 5%;"></div>
                        <button v-on:click="$event => addToCart($event)">Ajouter au Panier</button>
                    </div>
                </div>

            </div>

        </section>

        <!-- Avis des clients qui ont déjà acheté ce produit -->
        <section>

        </section>

        <!-- Les produits que l'utilisateur pourrait également aimer -->
        <section>

        </section>
    </main>
    <footer>
        footer
    </footer>
</template>
  
<style scoped>
* {
    font-family: sans-serif;
}

#product-col-1 {
    width: 70%;
    padding-left: 10px;
}

#product-col-2 {
    width: 30%;
}

.swiper {
    height: calc(100vh - 80px);
    /* full height - navbar heigt*/
}

.swiper img {
    max-height: 100%;
    max-width: 80%;
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

#sidepane {
    margin: 10px;
    padding: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    height: calc(100vh - 80px - 40px);
    /* device height - navbar height - some spacing */
    position: sticky;
    top: 90px;
    /* navbar height + margin */
}

#sidepane>* {
    margin-bottom: 10px;
}

#sidepane>h1 {
    margin-top: 5px;
}

#sidepane button {
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
    border-style: solid;
    background-color: aliceblue;
    transition: box-shadow 0.1s ease-in-out;
}

#sidepane button:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

#container-colors {
    background-color: aliceblue;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

#container-colors>div {
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transform: scale(1);
    border-radius: 0%;
    transition: transform 0.3s ease-in-out, border-radius 0.6s ease-in-out;
}

#container-colors>div:hover {
    transform: scale(1.1);
}

#container-buy {
    width: 100%;
    display: flex;
}

#container-buy input[type=number] {
    width: 20%;
    text-align: center;
    border-color: rgba(0, 0, 0, 0.2);
    border-style: solid;
    border-width: 1px 0px 1px 1px;
}

#container-buy input[type=number]::-webkit-inner-spin-button,
#container-buy input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

#container-quantity {
    width: 10%;
    border-color: rgba(0, 0, 0, 0.2);
    border-style: solid;
    border-width: 1px 1px 1px 0px;
}

#container-quantity>button {
    text-align: center;
    padding: 0px;
    width: 100%;
    font-size: 120%;
    border-width: 0px 0px 0px 1px;
}

#container-quantity>button:first-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

#container-buy>button {
    width: 65%;
}</style>