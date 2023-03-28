<script setup>

import { ref } from 'vue'
const See = ref(false);
const Modify = ref(false)

const toggleSeePassword = () => {
    return See.value = !See.value
}
const toggleModify = () => {
    return Modify.value = !Modify.value
}

const ChangeType = () => {
    return See.value ? 'text' : 'password'
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
        <button class="button-see-paswword" @click="toggleSeePassword">Vérifier</button>
        <button class="button-see-paswword" @click="toggleModify">Modifier</button>
    </div>
    <div v-if="Modify" class="modify-password">
        <p> Modification du Mot de passe </p>
        <div class="content-new-password">
            <div>
                <p> Nouveau mot de passe</p>
                <input type="password" v-model="newPassword" class="input-box">
            </div>
            <div>
                <p> Confirmation Mot de passe</p>
                <input type="password" v-model="newConfirmPassword" class="input-box">
            </div>
            <button class="button-confirm-password">Confirmer</button>
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
</style>