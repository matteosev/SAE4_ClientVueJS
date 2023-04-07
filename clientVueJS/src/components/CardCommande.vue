<script setup>
import axios from 'axios';
</script>

<script>
export default {
    props: ['commande'],
    data() 
    {
        return {
            lignesCommande: []
        };
    },
    created()
    {
    },
    mounted()
    {
        axios.get('https://localhost:7259/api/LigneCommandes/GetAllLigneCommandesByCommandeId/' + this.commande.commandeId)
        .then(responseL => {
            for (let l of responseL.data)
            {
                //console.log(l);
                axios.get('https://localhost:7259/api/Variantes/GetVarianteById/' + l.varianteId)
                .then(responseV => 
                {
                    //console.log(responseV.data);
                    axios.get('https://localhost:7259/api/Produits/GetById/' + responseV.data.produitId)
                    .then(responseP => 
                    {
                        //console.log(responseP.data);
                        this.lignesCommande.push({quantity: l.quantite, variante: responseV.data, produit: responseP.data});
                        console.log(this.lignesCommande);
                        this.$forceUpdate();
                    })
                    .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
            }
                //this.commandes.push(c);
        })
        .catch(error => console.error(error));
    },
    computed: {
        getLignesCommande() {
            return this.lignesCommande;
        }
    }
}
</script>

<template>
    <div class="container-commande">
        <div class="flex-row-grow">
            <h2>Commande N°{{ commande.commandeId }}</h2>
            <div>Prix {{ getCommandePrice }}</div>
            <div>Status {{ commande.etat }}</div>
        </div>
        <div class="flex-row-center">
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
                    <tr v-for="l in getLignesCommande">
                        <td> {{ l.produit.libelle }}</td>
                        <td :style="{ backgroundColor: l.variante.couleurHexa}"></td>
                        <td>{{ l.quantity }}</td>
                        <td>{{ Math.round(l.quantity * l.variante.prix * 100) / 100 }}€</td>
                    </tr>
                </tbody>
                <!--
                <tfoot>
                    <tr>
                        <td colspan="4">Montant total : {{ Math.round(cartStore.totalAmount * 100) / 100 }}€</td>
                    </tr>
                </tfoot>
                -->
            </table> 
        </div>
    </div>
</template>

<style scoped>
.container-commande {
    position: relative;
    background: #E4FFDC;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    transition: 0.3s ease-in-out;
}

.container-commande:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, .2);
}

table {
    margin-top: 20px;
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