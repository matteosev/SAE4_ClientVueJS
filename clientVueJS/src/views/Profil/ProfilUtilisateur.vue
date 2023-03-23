<script setup>
import Informations from '../../components/ProfilComponents/InformationsProfil.vue';
import Commandes from '../../components/ProfilComponents/MesCommandesProfil.vue';
import Paiements from '../../components/ProfilComponents/ModePaiements.vue';
import Confidentialite from '../../components/ProfilComponents/Confidentialié.vue';
import Aide from '../../components/ProfilComponents/Help.vue';
import { ref } from 'vue'

const navNames = {
    Informations,
    Commandes,
    Paiements,
    Confidentialite,
    Aide
}

const currentNav = ref('Informations')
</script>

<template>
    <h1 class="profil-title">Mon profil</h1>
    <div class="profil-container">
        <div class="navBar">
            <h2 class="navBar-title"> Menu</h2>
            <div class="nav-dynamic-component" v-for="(_i, navName) in navNames" :key="navName"
                :class="['nav-button-profil', { active: navName === currentNav }]" @click="currentNav = navName">
                {{ navName }}
            </div>
        </div>

        <div class="content-nav">
            <keep-alive>
                <component :is="navNames[currentNav]"> </component>
            </keep-alive>
        </div>
    </div>
</template>

<style scoped>
* {
    font-family: 'Space-Grotesk-Bold';
}

.profil-title {
    font-family: 'Space-Grotesk-Bold';
    text-transform: uppercase;
    position: relative;
    left: 20%;
    padding-top: 50px;
    font-size: 28px;
    border-bottom: solid 2px black;
    width: 50%;
}

.profil-container {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
}

.navBar {
    position: sticky;
    top: 95px;
    width: 30%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    margin-right: 10px;

}

.navBar-title {
    border-bottom: solid 4px #6F9575;
}

.nav-dynamic-component {
    /* padding: 0 30px 0 30px; */
    padding: 10px;
    margin-top: 20px;
    height: 30px;
    width: 50%;
    border-radius: 30px;
    text-align: center;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 18px;
    z-index: 9;
    align-items: left;

}

.nav-dynamic-component:hover {
    background-color: #DADADA;
    transform: translateX(30px);
}

.nav-dynamic-component.active {
    border-left: solid 5px #6F9575;
    transform: translateX(30px);
    background-color: #9FCDA6;
}

/* .nav-button-profil {
    border-right: solid 3px #9FCDA6;
    background-color: #9FCDA6;
} */

.content-nav {
    width: 70%;
    max-width: 100vw;
    height: 200vh;
    position: relative;
    top: 0;
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    border-left: solid 3px #6F9575;
    border-top: solid 3px #6F9575;
    border-radius: 10px;
}
</style>