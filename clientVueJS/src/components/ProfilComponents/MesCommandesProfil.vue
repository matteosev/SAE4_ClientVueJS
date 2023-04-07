<script setup>
import axios from 'axios';
import CardCommande from '../CardCommande.vue';
</script>

<script>
export default {
    props: ['avis'],
    data()
    {
        return {
            clientPseudo: "",
            commandes: []
        };
    },
    created()
    {
        var clientId = JSON.parse(localStorage.getItem("client")).clientId;

        axios.get('https://localhost:7259/api/Commandes/GetCommandeByClient/' + clientId)
        .then(response => {
            for (let c of response.data)
                this.commandes.push(c);
            console.log(this.commandes);
        })
        .catch(error => console.error(error));
    },
    mounted()
    {
    },
    methods:
    {
    }
}
</script>

<template>
    <div class="commande-container-title">
        <img src="../../assets/IconProfil/angle-petit-droit.png" alt="">
        <h2 class="commande-title">
            Mes Commandes
        </h2>
    </div>
    <CardCommande v-for="c of this.commandes" :commande="c"></CardCommande>
</template>

<style scoped>
* {
    font-family: 'Space-Grotesk-Bold';
    margin: 0;
    padding: 0;
}

.commande-container-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 60%;
}

.commande-title {
    padding: 20px;
    font-size: 28px;
    border-bottom: solid 2px;

}
</style>