<script setup>

import { ref, computed, reactive } from 'vue'
import Swal from 'sweetalert2'
import axios from '../../api/axios';
import fetchDataClient from '../../api/client.js'

var user = JSON.parse(localStorage.getItem('client'))
const newUser = reactive({})

newUser.prenomClient = user.prenomClient
newUser.nomClient = user.nomClient
newUser.portable = user.portable
newUser.civilite = user.civilite
newUser.adresseId = user.adresseId


function handleNom(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function handleTel(tel) {
    const formatted = tel.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    return formatted;
}

const isReadOnly = ref(true);

const toggleReadOnlyMode = () => {
    isReadOnly.value = !isReadOnly.value;
};

const buttonLabel = computed(() => {
    return isReadOnly.value ? 'Modifier' : 'Annuler';
});



const nomClient = ref(handleNom(newUser.nomClient));
const telClient = ref(handleTel(newUser.portable));

const Adresse = ref(false)

const toggleAdresse = () => {
    Adresse.value = !Adresse.value
}

if (newUser.adresseId == "null" || newUser.adresseId == null) {
    Adresse.value = false
}



const saveChanges = () => {
    ChangeData()
    Swal.fire({
        title: 'Êtes-vous sûr de vouloir modifier ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Modifier',
        denyButtonText: `Annuler`,
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            console.log(newUser)
            const response = await axios.put('api/clients/put/' + user.clientId, JSON.stringify(user))
            console.log(response);
            Swal.fire('Saved!', '', 'success')
            await fetchDataClient(localStorage.getItem('token'))
            isReadOnly.value = true
        } else if (result.isDenied) {
            Swal.fire('Annulation des modifications', '', 'info')
        }
    })
}

const ChangeData = () => {
    user.prenomClient = newUser.prenomClient
    user.nomClient = newUser.nomClient
    user.portable = newUser.portable
    user.civilite = newUser.civilite
}

// Adresse 


const handleHasAdresse = () => {
    if (localStorage.getItem('adresseClient'))
        return true
    else
        return false
}


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
                <input type="text" class="text-input" :readonly="isReadOnly" v-model="nomClient" />
            </div>
            <div class="info-card">
                <p class="info-card-title"> Prenom </p>
                <input type="text" class="text-input" v-model="newUser.prenomClient" :readonly="isReadOnly" />

            </div>
            <div class="info-card">
                <p class="info-card-title"> Numero télphone </p>
                <input type="text" class="text-input" v-model="telClient" :readonly="isReadOnly" />
            </div>
        </div>
        <div class="info-right">
            <div class="info-card">
                <p class="info-card-title"> Civilité </p>
                <select class="text-input" v-if="!isReadOnly" v-model="newUser.civilite">
                    <option disabled value=""> Quel est votre civilité ?</option>
                    <option value="Monsieur"> Monsieur</option>
                    <option value="Madame"> Madame</option>
                </select>
                <input type="text" class="text-input" v-if="isReadOnly" v-model="newUser.civilite" readonly />
            </div>
            <div class="info-card">
                <p class="info-card-title"> Date de naissance </p>
                <input type="date" class="text-input" :readonly="isReadOnly" />
            </div>
        </div>
    </div>
    <div class="container-adresse">
        <h3 class="title-adresse">Adresse</h3>
        <div v-if="!Adresse">
            <div class="content-no-adresse">
                <p> Vous n'avez pas d'adresse d'enregistrer </p>
                <div class="container-no-adresse">
                    <p> Voulez-vous enregistrer votre adresse ? </p>
                    <button class="button-adresse" @click="toggleAdresse"> Ajouter </button>
                </div>
            </div>
        </div>
        <div v-if="Adresse">
            <div class="info-container">
                <div class="info-left">
                    <div class="info-card">
                        <p class="info-card-title"> Rue </p>
                        <input type="text" class="text-input" :readonly="isReadOnly" v-model="nomClient" />
                    </div>
                    <div class="info-card">
                        <p class="info-card-title"> Ville </p>
                        <input type="text" class="text-input" v-model="newUser.prenomClient" :readonly="isReadOnly" />
                    </div>
                </div>
                <div class="info-right">
                    <div class="info-card">
                        <p class="info-card-title"> Code postal </p>
                        <input type="text" class="text-input" :readonly="isReadOnly" v-model="nomClient" />
                    </div>
                    <div class="info-card">
                        <p class="info-card-title"> Pays </p>
                        <input type="text" class="text-input" v-model="newUser.prenomClient" :readonly="isReadOnly" />
                    </div>
                </div>
            </div>
        </div>
        <div class="button-container">
            <button type="submit" class="button-modif" @click="toggleReadOnlyMode">{{ buttonLabel }} </button>
            <button class="button-modif" @click="saveChanges" v-if="!isReadOnly">Enregistrer</button>
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

.text-input:focus {
    outline: none;
}

.container-button-radio {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.container-adresse {
    margin-top: 30px;
}

.title-adresse {
    text-align: center;
}

.content-no-adresse {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
}

.container-no-adresse {
    display: flex;
    margin-bottom: 35px;
}
</style>