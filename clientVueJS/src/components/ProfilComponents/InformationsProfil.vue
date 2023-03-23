<script setup>

import axios from '../../api/axios.js';
import { ref, onMounted } from 'vue';

const client = ref({})

onMounted(async () => {
      const res = await axios.get("api/Clients/getbyid/1");
      client.value = res.data;
    });
    


</script>

<template>
    <div class="info-container-title">
        <img src="../../assets/IconProfil/angle-petit-droit.png" alt="">
        <h2 class="info-title">
            Mes informations
        </h2>
    </div>
    <div class="info-container">
        <div class="info-left">
            <div class="info-card">
                <p class="info-card-title"> Nom </p>
                <input type="text" class="text-input" />
            </div>
            <div class="info-card">
                <p class="info-card-title"> Prenom </p>
                <input type="text" class="text-input" v-bind="client.value.portable"/>
            </div>
            <div class="info-card">
                <p class="info-card-title"> Numero télphone </p>
                <input type="text" class="text-input"/>
            </div>
        </div>
        <div class="info-right">
            <div class="info-card">
                <p class="info-card-title"> Civilité </p>
                <select class="text-input">
                    <option disabled value=""> Quel est votre civilité ?</option>
                    <option> Homme</option>
                    <option> Femme</option>
                    <option> Autre</option>
                </select>
            </div>
            <div class="info-card">
                <p class="info-card-title"> Date de naissance </p>
                <input type="text" class="text-input"/>
            </div>
        </div>
    </div>
    <div class="button-container">
        <button type="submit" class="button-modif" @click="handleclick"> Modifier </button>
    </div>
</template>

<style scoped>
* {
    font-family: 'Space-Grotesk-Bold';
    margin: 0;
    padding: 0;
}

.info-container-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 60%;
}

.info-title {
    padding: 20px;
    font-size: 28px;
    border-bottom: solid 2px;

}

.info-container {
    display: flex;
    justify-content: space-around;
    align-items: center;

}

.info-card {
    padding-top: 20px;
}

.info-card-title {
    font-size: 18px;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-modif {
    text-decoration: none;
    outline-style: none;
    background-color: #6F9575;
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    text-transform: uppercase;
    visibility: visible;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    
}

.button-modif:hover {
    background-color: #3B5C37;
}

.text-input {
    padding: 10px;
    border: solid 2px #3B5C37;
    font-size: 18px;
    margin-top: 9px;
    border-radius: 4px;
}

.text-input:focus{
    outline: none;
}

.container-button-radio{
    display: flex;
    justify-content: space-around;
    align-items: center;
}

</style>