<script setup></script>
<template>
    <div class="commande-container-title">
        <img src="../../assets/IconProfil/angle-petit-droit.png" alt="">
        <h2 class="commande-title">
            Mes Commandes
        </h2>
    </div>
        <div class="container-commande">
            <h2 class="title-numero-commande"> Commande N° 42</h2>
            <div class="article-commande">
                    Articles : 
            </div>
            <div class="details-commande">
                <p class="prix-commande">Prix : 1560.33 €</p>
                <p class="status-commande"> Status commande : </p>
            </div>
        </div>
    
</template>

<style scoped>
* {
    font-family: 'Space-Grotesk-Bold';
    margin: 0;
    padding: 0;
}

.commande-container-title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 60%;
}

.commande-title {
    padding: 20px;
    font-size: 28px;
    border-bottom: solid 2px;

}

.container-commande{
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background: #E4FFDC;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    height: 10%;
}

.title-numero-commande{
    position: absolute;
    top: 15%;
    left: 5%;
}

.details-commande{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>