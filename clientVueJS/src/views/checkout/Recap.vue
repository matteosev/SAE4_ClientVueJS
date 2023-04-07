<script setup>
import axios from '../../api/axios';
import { useOrderStore } from '../../stores/order';
import { useCartStore } from '../../stores/cart';
</script>

<script>
export default {
    props: [],
    data() 
    {
        return {
            client: JSON.parse(localStorage.getItem("client")),
            orderStore: useOrderStore(),
            cartStore: useCartStore(),
            orderLines: []
        };
    },
    created()
    {
        for (let line of this.cartStore.lines)
        {
            console.log(line)
            axios.get('/api/Produits/GetById/' + line.variante.produitId)
            .then(response => {
                let libelle = response.data.libelle;
                axios.get('/api/Variantes/GetVarianteById/' + line.variante.varianteId)
                .then(response => this.orderLines.push({ name: libelle, color: response.data.couleurHexa, quantity: line.quantity, price: line.variante.prix}));
            });
        }
    },
    mounted()
    {
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
    <h2>Récap</h2>
    <div class="flex-row">
        <div class="flex-col" style="padding: 5px; flex-grow: 1;">
            <h3>Options :</h3>
            <div class="flex-row">
                <label for="express">Express :</label>
                <div style="width: 10px"></div>
                <input type="checkbox" style="aspect-ratio: 1 / 1;" id="express" v-model="orderStore.express" disabled />
                <div style="width: 10px"></div>
                <label for="collect">Collecte :</label>
                <div style="width: 10px"></div>
                <input type="checkbox" style="height: 100%; aspect-ratio: 1 / 1;" id="collect" v-model="orderStore.collect" disabled />
            </div>
            <div class="flex-col" style="flex-grow: 1;">
                <label for="details">Instructions : </label>
                <textarea style="height: 100%" type="text" id="details" v-model="orderStore.details" disabled></textarea>
            </div>
        </div>
        <div class="flex-row-center" style="padding: 5px;">
            <table>
                <thead>
                    <tr>
                        <th colspan="4">Résumé de la commande</th>
                    </tr>
                    <tr>
                        <th>Produit</th>
                        <th>Couleur</th>
                        <th>Quantité</th>
                        <th>Montant</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="line of orderLines">
                        <td>{{ line.name }}</td>
                        <td :style="{ backgroundColor: line.color}"></td>
                        <td>{{ line.quantity }}</td>
                        <td>{{ Math.round(line.quantity * line.price * 100) / 100 }}€</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4">Montant total : {{ Math.round(cartStore.totalAmount * 100) / 100 }}€</td>
                    </tr>
                </tfoot>
            </table> 
        </div>
    </div>

    <div class="flex-row-center footer-nav">
        <RouterLink to="/checkout/infos">&lt Précédent</RouterLink>
        <RouterLink to="/checkout/payment">Suivant &gt</RouterLink>
    </div>
</template>

<style scoped>

table {
  border-collapse: collapse;
}

th{
    color: white;
    background-color: #527140CF;
    padding: 15px;
}

tr{
    border: 1px solid #5271409F;
}

td{
    color: #495057;
    overflow: hidden; 
    white-space: nowrap;
    background-clip: content-box;
    text-align: center;
    padding: 10px;
    width: 25%;
}
</style>