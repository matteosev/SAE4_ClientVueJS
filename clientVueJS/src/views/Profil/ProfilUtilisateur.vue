<script setup>
import NavBarProfil from '../../components/ProfilComponents/NavBarProfil.vue'
import ContentProfil from '../../components/ProfilComponents/ContentProfil.vue'
</script>

<template>
    <h1 class="profil-title">Mon profil</h1>
    <div class="profil-container">
        <NavBarProfil />
        <ContentProfil />
    </div>
</template>

<style scoped>
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
    align-items: center;
}
</style>