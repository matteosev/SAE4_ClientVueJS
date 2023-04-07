<script setup>

import { ref } from 'vue'
import axios from '../../api/axios.js';

var user = JSON.parse(localStorage.getItem('client'));
const SeePassModify = ref(false);
const newPassword = ref('');
const newConfirmPassword = ref('')
const toggleModifyPassword = () => {
    return SeePassModify.value = !SeePassModify.value
}

const ChangeTypeModify = () => {
    return SeePassModify.value ? 'text' : 'password'
}

const CheckVerifModify = () => {
    return SeePassModify ? 'Vérifier' : 'Cacher'
}

const addNewPassword = async () => {
    if (newPassword.value == newConfirmPassword.value)
    {
        const password = user.password.value;
        const newpassword = newPassword.value;
        const encryptedPassword = btoa(newpassword);
        const putUser = {...user, password: encryptedPassword}
        const response = await axios.put("/api/Clients/Put/" + user.clientId, JSON.stringify(putUser));
    }
}




</script>

<template>
    <div class="cb-container-title">
        <img src="../../assets/IconProfil/angle-petit-droit.png" alt="">
        <h2 class="cb-title">
            Confidentialité
        </h2>
    </div>
    <div class="modify-password">
        <div class="titre-modifier">
            <h3 class="title-modify"> Modification du Mot de passe </h3>
        </div>
        <div class="content-new-password">
            <div class="content-modify">
                <p class="title-content-modify"> Nouveau mot de passe</p>
                <input :type="ChangeTypeModify()" v-model="newPassword" class="input-box">
            </div>
            <div class="content-modify">
                <p class="title-content-modify"> Confirmation Mot de passe</p>
                <input :type="ChangeTypeModify()" v-model="newConfirmPassword" class="input-box">
            </div>
            <div class="container-button">
                <button class="button-paswword" @click="addNewPassword">Confirmer</button>
                <button class="button-paswword" @click="toggleModifyPassword">{{ CheckVerifModify() }}</button>
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

.cb-title {
    padding: 20px;
    font-size: 28px;
    border-bottom: solid 2px;
}

.title-part {
    margin-top: 40px;
    text-align: center;
    font-size: 18px;
}

.container-mdp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
}

.content {
    margin-bottom: 15px;
}

.input-box {
    margin-left: 10px;
    padding: 10px;
    border: solid 2px #3B5C37;
    font-size: 18px;
    margin-top: 9px;
    border-radius: 4px;
    background-color: white;
}

.button-paswword {

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
    margin-right: 15px;
    text-align: center;

}

.button-paswwordd:hover {
    background-color: #3B5C37;
}

.content-new-password {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.content-modify {
    margin-top: 10px;
    margin-bottom: 15px;
}

.title-content-modify {
    margin-left: 10px;
}

.titre-modifier {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-modify {
    margin-top: 50px;
    padding: 10px;
    left: 37%;
    width: 265px;
    border-left: solid 2px #3B5C37;
    border-right: solid 2px #3B5C37;
}
</style>