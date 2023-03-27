<script setup>

import { ref, computed, reactive } from 'vue'



var user = JSON.parse(localStorage.getItem('client'))
const newUser = reactive({})

newUser.prenomClient = user.prenomClient
newUser.nomClient = user.nomClient
newUser.portable = user.portable

console.log(newUser);

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
    console.log(isReadOnly.value);
};

const buttonLabel = computed(() => {
    return isReadOnly.value ? 'Modifier' : 'Annuler';
});

const hasChanges = computed(() => {
    return user.value !== newUser.value;
});

const nomClient = ref(handleNom(newUser.nomClient));
const telClient = ref(handleTel(newUser.portable));

console.log(newUser.prenomClient);
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
                <select class="text-input" :readonly="isReadOnly">
                    <option disabled value=""> Quel est votre civilité ?</option>
                    <option> Monsieur</option>
                    <option> Madame</option>

                </select>
            </div>
            <div class="info-card">
                <p class="info-card-title"> Date de naissance </p>
                <input type="text" class="text-input" :readonly="isReadOnly" />
            </div>
        </div>
    </div>
    <div class="button-container">
        <button type="submit" class="button-modif" @click="toggleReadOnlyMode">{{ buttonLabel }} </button>
        <button class="button-modif" @click="saveChanges" :disabled="!hasChanges">Enregistrer</button>
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
</style>