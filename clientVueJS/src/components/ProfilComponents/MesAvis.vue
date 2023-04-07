<script setup>

import { ref, reactive, computed } from 'vue'
import Swal from 'sweetalert2'
import axios from '../../api/axios';
import CardAvis from '../CardAvis.vue';

var clientId = JSON.parse(localStorage.getItem('client')).clientId;
var clientAvis = reactive([]);
var indexEditedAvis = ref(-1);

axios.get('/api/Avis/GetAllAvisByClientId/' + clientId)
.then(response =>{
    for (let avis of response.data)
        clientAvis.push(avis);
})
.catch(error => console.error(error));

function startEditingAvis(i){
    indexEditedAvis.value = i;
}

function saveEditingAvis(){
    let isoDateString = new Date().toISOString();
    let avis = {
        avisId: clientAvis[indexEditedAvis.value].avisId,
        varianteId: clientAvis[indexEditedAvis.value].varianteId,
        clientId: JSON.parse(localStorage.getItem("client")).clientId,
        titre: clientAvis[indexEditedAvis.value].titre,
        texte: clientAvis[indexEditedAvis.value].texte,
        note: clientAvis[indexEditedAvis.value].note,
        date: isoDateString,
        avis_Client: null,
        avis_Photo: null,
        avis_Variante: null
    }
    axios.put("/api/Avis/Put/" + avis.avisId, avis).then(response => {});
    indexEditedAvis.value = -1;
}

function deleteEditingAvis(){
    axios.delete("/api/Avis/Delete/" + clientAvis[indexEditedAvis.value].avisId)
    .then(response => {});
    clientAvis.splice(indexEditedAvis.value, 1)
    indexEditedAvis.value = -1;
}

function stopEditingAvis(){
    indexEditedAvis.value = -1;
}

</script>

<template>
    <div id="container">
        <div class="info-container-title">
            <img src="../../assets/IconProfil/angle-petit-droit.png" alt="">
            <h2 class="info-title">
                Mes avis
            </h2>
        </div>
        <div v-if="indexEditedAvis > -1">
            <div id="formAvis">
                <div style="display: flex;" id="formAvis-firstLine">
                    <div class="flex-col" style="width: 70%;" id="formAvis-firstLine-containerTitle">
                        <label>Titre</label>
                        <input type="text" v-model="clientAvis[indexEditedAvis].titre" required>
                    </div>
                    <div style="width: 2%;"></div>
                    <div class="flex-col" style="width: 26%;" id="formAvis-firstLine-containerNote">
                        <label>Note</label>
                        <input type="range" v-model="clientAvis[indexEditedAvis].note" min="1" max="5" list="tickmarks" name="noteAvis" id="formAvisSejourNote" required>
                        <datalist id="tickmarks">
                            <option value="1" label="1"></option>
                            <option value="2" label="2"></option>
                            <option value="3" label="3"></option>
                            <option value="4" label="4"></option>
                            <option value="5" label="5"></option>
                        </datalist>
                    </div>
                    <div style="width: 2%;"></div>
                </div>
                <div>
                    <label>Commentaire :</label><br>
                    <textarea v-model="clientAvis[indexEditedAvis].texte" required style="width: 100%;" rows="10"></textarea>
                </div>
                <!--<div id="avisFooter">
                    <p>{{ new Date(avis.date).toLocaleDateString('fr-FR') }}</p>
                    <p>{{ avis.clientId }}</p>
                </div>-->
                <div style="display: flex;">
                    <button v-on:click="$event => stopEditingAvis()" style="width: 33%;">Annuler</button>
                    <div style="width: 1%;"></div>
                    <button v-on:click="$event => deleteEditingAvis()" style="width: 32%;">Supprimer</button>
                    <div style="width: 1%;"></div>
                    <button v-on:click="$event => saveEditingAvis()" style="width: 33%;">Sauvegarder</button>
                </div>
            </div>
        </div>
        <div id="avis__container" v-else>
            <CardAvis class="cardAvis" v-on:click="$event => startEditingAvis(i)" v-for="(a, i) in clientAvis" :key="a.avisId" :avis="clientAvis[i]"></CardAvis>
        </div>
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

.flex-col {
    display: flex;
    flex-direction: column;
}

#container{
    padding: 10px;
}



#formAvis textarea {
    resize: none;
    border-radius: 2px;
}

#formAvis > button {
    width: 100%;
    padding: 10px;
}

.cardAvis:hover{
    background-color: rgba(0,0,0,0.2);
    cursor: pointer;
}

</style>