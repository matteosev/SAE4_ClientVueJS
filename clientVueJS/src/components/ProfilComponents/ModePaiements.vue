<script setup>

import { ref } from 'vue'

const hasCb = ref(true)


</script>
<template>
    <div class="cb-container-title">
        <img src="../../assets/IconProfil/angle-petit-droit.png" alt="">
        <h2 class="cb-title">
            Mes modes de paiements
        </h2>
    </div>
    <div container-cb>
        <div v-if="hasCb" class="cb-content">
            <div class="left">
                <div class="cb-card">
                    <p class="cb-card-title"> Nom </p>
                    <input type="text" class="text-input" />
                </div>
                <div class="cb-card">
                    <p class="cb-card-title"> Prenom </p>
                    <input type="text" class="text-input" />
                </div>
            </div>
            <div class="right">
                <div class="cb-card">
                    <p class="cb-card-title"> Numéro CB </p>
                    <input type="text" class="text-input" />
                </div>
                <div class="cb-card">
                    <p class="cb-card-title"> Date Expiration </p>
                    <input type="date" v-model="date" class="text-input" />
                </div>
            </div>
            <button class="button-save"> Enregistrer </button>
        </div>

        <div v-if="!hasCb" class="no-cb">
            <p>Vous n'avez pas de carte bleue enregistré</p>
            <button class="button-add-cb"> Enregistrer une carte bleue</button>
        </div>
    </div>
</template>
<style scoped>
* {
    font-family: 'Space-Grotesk-Bold';
    margin: 0;
    padding: 0;
}

.cb-container-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 60%;
}

.cb-card {
    margin-top: 20px;
}

.cb-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
}

.cb-title {
    padding: 20px;
    font-size: 28px;
    border-bottom: solid 2px;
}

.cb-card-title {
    font-size: 18px;
}

.text-input {
    padding: 10px;
    border: solid 2px #3B5C37;
    font-size: 18px;
    margin-top: 9px;
    border-radius: 4px;
}

.button-save {
    position: absolute;
    top: 120%;
    padding: 15px;
    font-size: 14px;
    border: solid 2px #3B5C37;
    background-color: #fff;
    border-radius: 10px;
    text-transform: uppercase;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.button-save:hover {
    background-color: #3B5C37;
    color: white;
}
</style>