<script setup>
import NavBarProfil from '../../components/ProfilComponents/NavBarProfil.vue'
</script>

<template>
    <h1 class="profil-title">Mon profil</h1>
        <div class="profil-container">
            <NavBarProfil />
        </div>
</template>

<style scoped>

.profil-title{
    font-family: 'Space-Grotesk-Bold';
    text-transform: uppercase;
    position: relative;
    left: 20%;
    padding-top: 50px;
    font-size: 28px;
}
</style>