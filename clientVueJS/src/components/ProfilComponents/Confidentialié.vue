<script setup>

import { ref } from 'vue'

const See = ref(false)
const SeePassModify = ref(false)
const Modify = ref(false)

const toggleSeePassword = () => {
    return See.value = !See.value
}
const toggleModify = () => {
    return Modify.value = !Modify.value
}

const toggleModifyPassword = () => {
    return SeePassModify.value = !SeePassModify.value
}

const ChangeType = () => {
    return See.value ? 'text' : 'password'
}

const ChangeTypeModify = () => {
    return SeePassModify.value ? 'text' : 'password'
}

const CheckVerif = () => {
    return See.value ? 'Cacher' : 'Vérifier'
}

const CheckVerifModify = () => {
    return SeePassModify ? 'Vérifier' : 'Cacher'
}

</script>

<template>
    <div class="cb-container-title">
        <img src="../../assets/IconProfil/angle-petit-droit.png" alt="">
        <h2 class="cb-title">
            Confidentialité
        </h2>
    </div>
    <p class="title-part"> Mot de passe </p>
    <div class="container-mdp">
        <div class="content">
            <input :type="ChangeType()" class="input-box">
        </div>
        <div class="container-button">
            <button class="button-paswword" @click="toggleSeePassword">{{ CheckVerif() }}</button>
            <button class="button-paswword" @click="toggleModify">Modifier</button>
        </div>
    </div>
    <div v-if="Modify" class="modify-password">
        <h3 class="title-modify"> Modification du Mot de passe </h3>
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
                <button class="button-paswword">Confirmer</button>
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

.title-modify {
    margin-top: 30px;
    text-align: left;
    margin-left: 150px;


}
</style>