<script setup>

import { ref, computed, reactive, watch, onMounted } from 'vue'
import Swal from 'sweetalert2'
import axios from '../../api/axios';
import { fetchDataClient } from '../../api/client.js'

var user = JSON.parse(localStorage.getItem('client'))
const newUser = reactive({})

newUser.prenomClient = user.prenomClient
newUser.nomClient = handleNom(user.nomClient)
newUser.portable = user.portable
newUser.civilite = user.civilite
newUser.adresseId = user.adresseId


function handleNom(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const isReadOnly = ref(true);

const toggleReadOnlyMode = () => {
    isReadOnly.value = !isReadOnly.value;
};

const buttonLabel = computed(() => {
    return isReadOnly.value ? 'Modifier' : 'Annuler';
});

const addAdresse = ref(false)

const toggleAdresse = () => {
    addAdresse.value = true
}

if (newUser.adresseId == "null" || newUser.adresseId == null) {
    addAdresse.value = false
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
        if (result.isConfirmed) {
            console.log(user)
            console.log(adresse)
            const response = await axios.put('api/clients/put/' + user.clientId, JSON.stringify(user))
            const responseAdresse = await axios.put('api/adresses/put/' + adresseClient.adresseId, JSON.stringify(adresseClient))
            console.log(response);
            console.log(responseAdresse);
            Swal.fire('Saved!', '', 'success')
            await fetchDataClient(localStorage.getItem('token'))
            isReadOnly.value = true
        } else if (result.isDenied) {
            Swal.fire('Annulation des modifications', '', 'info')
        }
    })
}

const adresseClient = reactive({})
var adresse = reactive({})

const adresseHere = () => {
    if (localStorage.getItem("adresseClient")) {
        return true
    }
    else
        return false
}
adresse = JSON.parse(localStorage.getItem('adresseClient'))
const loadAdresseData = onMounted(() => {

    adresseClient.adresseId = adresse.adresseId
    adresseClient.rue = adresse.rue
    adresseClient.ville = adresse.ville
    adresseClient.codePostal = adresse.codePostal
    adresseClient.pays = adresse.pays
    adresseClient.telFixe = adresse.telFixe
    adresseClient.remarques = adresse.remarques
})



const ChangeData = () => {
    user.prenomClient = newUser.prenomClient;
    user.nomClient = newUser.nomClient;
    user.portable = newUser.portable;
    user.civilite = newUser.civilite;
    adresse.rue = adresseClient.rue;
    adresse.ville = adresseClient.ville;
    adresse.pays = adresseClient.pays;
    adresse.codePostal = adresseClient.codePostal;
    adresse.remarques = adresseClient.remarques;
    adresse.telFixe = adresseClient.telFixe;
}

// Adresse 




const addRemarques = ref(false);
const addTelFixe = ref(false)

const toggleRemarqueAdresse = () => {
    addRemarques.value = !addRemarques.value
    console.log(addRemarques.value)
}
const toggleTelFixeAdresse = () => {
    addTelFixe.value = !addTelFixe.value
}

const addOrRemove = (value) => {
    return value ? 'Annuler' : 'Ajouter'
}


const addAdresseToClient = () => {
    adresseClient.adresseId = user.clientId;
    Swal.fire({
        title: 'Êtes-vous sûr de vouloir ajouter une Adresse ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ajouter',
        denyButtonText: `Annuler`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            console.log(user)
            const response = await axios.post('api/adresses/PostAdresseClient', JSON.stringify(adresseClient))
            console.log(response);
            Swal.fire('Ajoutée!', '', 'success')
            await fetchDataClient(localStorage.getItem('token'))
            isReadOnly.value = true
        } else if (result.isDenied) {
            Swal.fire('Annulation des modifications', '', 'info')
        }
    })
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
                <input type="text" class="text-input" :readonly="isReadOnly" v-model="newUser.nomClient" />
            </div>
            <div class="info-card">
                <p class="info-card-title"> Prenom </p>
                <input type="text" class="text-input" v-model="newUser.prenomClient" :readonly="isReadOnly" />

            </div>
            <div class="info-card">
                <p class="info-card-title"> Numero télphone </p>
                <input type="text" class="text-input" v-model="newUser.portable" :readonly="isReadOnly" />
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
                <input type="text" class="text-input" v-if="isReadOnly" v-model="user.civilite" readonly />
            </div>
            <div class="info-card">
                <p class="info-card-title"> Date de naissance </p>
                <input type="date" class="text-input" :readonly="isReadOnly" />
            </div>
        </div>
    </div>
    <div class="container-adresse">
        <h3 class="title-adresse">Adresse</h3>
        <div v-if="adresseHere()">
            <div class="info-container">
                <div class="info-left">
                    <div class="info-card">
                        <p class="info-card-title"> Rue </p>
                        <input type="text" class="text-input" v-model="adresseClient.rue" :readonly="isReadOnly" />
                    </div>
                    <div class="info-card">
                        <p class="info-card-title"> Ville </p>
                        <input type="text" class="text-input" v-model="adresseClient.ville" :readonly="isReadOnly" />
                    </div>
                    <div class="info-card" v-if="adresseClient.remarques">
                        <p class="info-card-title"> Remarques </p>
                        <input type="text" class="text-input" v-model="adresseClient.remarques" :readonly="isReadOnly" />
                    </div>
                </div>
                <div class="info-right">
                    <div class="info-card">
                        <p class="info-card-title"> Code postal </p>
                        <input type="text" class="text-input" v-model="adresseClient.codePostal" :readonly="isReadOnly" />
                    </div>
                    <div class="info-card">
                        <p class="info-card-title"> Pays </p>
                        <input type="text" class="text-input" v-model="adresseClient.pays" :readonly="isReadOnly" />
                    </div>
                    <div class="info-card" v-if="adresseClient.telFixe">
                        <p class="info-card-title"> TelFixe </p>
                        <input type="text" class="text-input" v-model="adresseClient.telFixe" :readonly="isReadOnly" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!adresseHere()">
            <div class="content-no-adresse">
                <p> Vous n'avez pas d'adresse d'enregistré </p>
                <div class="container-no-adresse">
                    <p> Voulez-vous enregistrer votre adresse ? </p>
                    <button class="button-adresse" @click="toggleAdresse"> Ajouter </button>
                </div>
            </div>
        </div>
        <div v-if="addAdresse">
            <div class="info-container">
                <div class="info-left">
                    <div class="info-card">
                        <p class="info-card-title"> Rue </p>
                        <input type="text" class="text-input" v-model="adresseClient.rue" />
                    </div>
                    <div class="info-card">
                        <p class="info-card-title"> Ville </p>
                        <input type="text" class="text-input" v-model="adresseClient.ville" />
                    </div>
                    <div class="info-card" v-show="addRemarques">
                        <p class="info-card-title"> Remarques </p>
                        <input type="text" class="text-input" v-model="adresseClient.remarques" />
                    </div>
                </div>
                <div class="info-right">
                    <div class="info-card">
                        <p class="info-card-title"> Code postal </p>
                        <input type="text" class="text-input" v-model="adresseClient.codePostal" />
                    </div>
                    <div class="info-card">
                        <p class="info-card-title"> Pays </p>
                        <input type="text" class="text-input" v-model="adresseClient.pays" />
                    </div>
                    <div class="info-card" v-show="addTelFixe">
                        <p class="info-card-title"> TelFixe </p>
                        <input type="text" class="text-input" v-model="adresseClient.telFixe" />
                    </div>
                </div>

            </div>
            <div class="container-button-adresse">
                <button class="button-modif" @click="toggleRemarqueAdresse">{{ addOrRemove(addRemarques) }} une remarque
                    ?</button>
                <button class="button-modif" @click="toggleTelFixeAdresse">{{ addOrRemove(addTelFixe) }} un télphone
                    fixe
                    ?</button>
            </div>
        </div>
        <button class="button-add-adresse" v-if="addAdresse" @click="addAdresseToClient"> Ajouter une adresse</button>
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
    margin: 10px;
    transition: all 0.3s ease-in-out;
}

.button-modif:hover {
    background-color: #3B5C37;
}

.button-add-adresse .text-input {
    padding: 10px;
    border: solid 2px #3B5C37;
    font-size: 18px;
    margin-top: 9px;
    border-radius: 4px;
}

.text-input:focus {
    outline: none;
}

.text-input {
    padding: 10px;
    border: solid 2px #3B5C37;
    font-size: 18px;
    margin-top: 9px;
    border-radius: 4px;
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

.container-button-adresse {
    display: flex;
    justify-content: center;
    align-items: center;
}

.autocomplete-results {
    position: absolute;
    background-color: white;
    border: 1px solid #3B5C37;
    border-radius: 4px;
    z-index: 100;
}

.autocomplete-result {
    padding: 10px;
    cursor: pointer;
}

.autocomplete-result:hover {
    background-color: #3B5C37;
    color: white;
}
</style>