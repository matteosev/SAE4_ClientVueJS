<script setup>

import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'
import axios from '../../api/axios'
import { fetchDataCbClient, fetchDataClient } from '../../api/client.js'


var user = JSON.parse(localStorage.getItem('client'))
const hasCb = ref(false)
const addCb = ref(false)
const newCb = reactive({})
var cb = reactive({})
var coucheCb = reactive({})
const handleHasCb = () => {
    if (localStorage.getItem('cbClient')) {
        cb = JSON.parse(localStorage.getItem('cbClient'))
        coucheCb = cb
        coucheCb.derniersNums = handleDernierNums(cb.derniersNums)
        coucheCb.numeroCB = ''
        return hasCb.value = true
    }
    else
        return hasCb.value = false
}

const toggleAddCb = () => {
    addCb.value = !addCb.value
}

const textAddCb = () => {
    return addCb.value ? "Ne pas enregistrer" : "Enregistrer"
}

const handleDernierNums = (string) => {
    return string = "****-****-****-" + string
}

const modifyCb = () => {
    coucheCb.clientId = user.clientId
    delete coucheCb.derniersNums
    Swal.fire({
        title: 'Êtes-vous sûr de vouloir modifier votre CB ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Modifier',
        denyButtonText: `Annuler`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await axios.put('api/CarteBancaire/Put/' + coucheCb.carteBancaireId, JSON.stringify(coucheCb))
            await fetchDataCbClient()
            Swal.fire('Enregistrer !', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Annulation des modifications', '', 'info')
        }
    })

}

const addNewCb = () => {
    newCb.clientId = user.clientId
    console.log(newCb)
    Swal.fire({
        title: 'Êtes-vous sûr de vouloir ajouter une nouvelle CB ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ajouter',
        denyButtonText: `Annuler`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await axios.post('api/CarteBancaire/Post', JSON.stringify(newCb))
            Swal.fire('Enregistrer !', '', 'success')
            await fetchDataClient(localStorage.getItem('token'))
        } else if (result.isDenied) {
            Swal.fire('Annulation des modifications', '', 'info')
        }
    })
}

const isReadOnly = ref(true);

const toggleReadOnlyMode = () => {
    isReadOnly.value = !isReadOnly.value;
    coucheCb.numeroCB = ''
};

const buttonLabel = () => {
    coucheCb.numeroCB = ''
    return isReadOnly.value ? 'Modifier' : 'Annuler'
}


</script>
<template>
    <div class="cb-container-title">
        <img src="../../assets/IconProfil/angle-petit-droit.png" alt="">
        <h2 class="cb-title">
            Mes modes de paiements
        </h2>
    </div>
    <div class="container-cb">
        <div v-if="handleHasCb()" class="cb-content">
            <div class="left">
                <div class="cb-card">
                    <p class="cb-card-title"> Nom </p>
                    <input type="text" class="text-input" v-model="coucheCb.nomCB" :readonly="isReadOnly" />
                </div>
                <div class="cb-card">
                    <p class="cb-card-title"> Prenom </p>
                    <input type="text" class="text-input" v-model="coucheCb.prenomCB" :readonly="isReadOnly" />
                </div>
            </div>
            <div class="right">
                <div class="cb-card">
                    <p class="cb-card-title"> Numéro CB </p>
                    <input type="text" class="text-input" v-model="coucheCb.derniersNums" v-if="isReadOnly" />
                    <input type="text" class="text-input" v-model="coucheCb.numeroCB" v-if="!isReadOnly" />
                </div>
                <div class="cb-card">
                    <p class="cb-card-title"> Date Expiration </p>
                    <input type="text" class="text-input" placeholder="MM/AAAA" v-model="coucheCb.dateExpiration"
                        v-if="isReadOnly" :readonly="isReadOnly" />
                    <input type="text" class="text-input" placeholder="MM/AAAA" v-model="coucheCb.dateExpiration"
                        v-if="!isReadOnly" />
                </div>
            </div>
        </div>
        <div class="button-container">
            <button type="submit" class="button-add-cb" v-if="handleHasCb()" @click="toggleReadOnlyMode">{{ buttonLabel() }}
            </button>
            <button class="button-add-cb" @click="modifyCb" v-if="!isReadOnly"> Enregistrer </button>
        </div>

        <div v-if="!handleHasCb()" class="no-cb">
            <p class="title-no-cb">Vous n'avez pas de carte bleue enregistré</p>
            <button class="button-add-cb" @click="toggleAddCb"> {{ textAddCb() }} une carte bleue</button>

            <div v-if="addCb" class="cb-content">
                <div class="left">
                    <div class="cb-card">
                        <p class="cb-card-title"> Nom </p>
                        <input type="text" class="text-input" v-model="newCb.nomCB" />
                    </div>
                    <div class="cb-card">
                        <p class="cb-card-title"> Prenom </p>
                        <input type="text" class="text-input" v-model="newCb.prenomCB" />
                    </div>
                </div>
                <div class="right">
                    <div class="cb-card">
                        <p class="cb-card-title"> Numéro CB </p>
                        <input type="text" class="text-input" v-model="newCb.numeroCB" />
                    </div>
                    <div class="cb-card">
                        <p class="cb-card-title"> Date Expiration </p>
                        <input type="text" class="text-input" placeholder="MM/AAAA" v-model="newCb.dateExpiration" />
                    </div>
                </div>
                <button class="button-save" @click="addNewCb"> Ajouter </button>
            </div>
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

.left {
    margin-right: 40px;
}

.button-save {
    position: absolute;
    top: 120%;
    padding: 15px;
    font-size: 14px;
    border: solid 2px #fff;
    color: #fff;
    background-color: #3B5C37;
    border-radius: 10px;
    text-transform: uppercase;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.button-save:hover {
    background-color: #fff;
    color: #3B5C37;
    border: solid 2px #3B5C37;
}

.no-cb {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.title-no-cb {
    font-size: 18px;
}

.button-add-cb {
    padding: 10px;
    font-size: 14px;
    border: solid 2px #3B5C37;
    background-color: #fff;
    border-radius: 10px;
    text-transform: uppercase;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    margin-right: 20px;
}

.button-add-cb:hover {
    background-color: #3B5C37;
    color: white;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>