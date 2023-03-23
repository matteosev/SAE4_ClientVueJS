<script setup>
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
                <input type="text" class="">
            </div>
            <div class="info-card">
                <p class="info-card-title"> Prenom </p>
                <input type="text">
            </div>
            <div class="info-card">
                <p class="info-card-title"> Numero télphone </p>
                <input type="text">
            </div>
        </div>
        <div class="info-right">
            <div class="info-card">
                <p class="info-card-title"> Civilité </p>
                <input type="text">
            </div>
            <div class="info-card">
                <p class="info-card-title"> Date de naissance </p>
                <input type="text">
            </div>
        </div>
    </div>
    <div class="button-container">
        <button type="submit"> Modifier </button>
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
</style>