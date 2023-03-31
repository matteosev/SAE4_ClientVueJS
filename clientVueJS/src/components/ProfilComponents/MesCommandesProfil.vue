<script setup>




</script>
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
        <button class="button-details"> <img class="icon-plus" src="../../assets/IconProfil/icons8-plus-32.png" alt="plus">
            Voir le details</button>
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

.container-commande {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background: #E4FFDC;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    height: 10%;
    transition: 0.3s ease-in-out;
}

.container-commande:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, .2);
}

.title-numero-commande {
    position: absolute;
    top: 15%;
    left: 5%;
}

.details-commande {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.prix-commande {
    position: absolute;
    top: 70%;
    left: 5%;
}

.status-commande {
    position: absolute;
    top: 20%;
    left: 80%;
}

.article-commande {
    position: absolute;
    top: 20%;
}

.icon-plus {
    width: 25px;
    height: auto;
    padding-right: 10px;
}

.button-details {
    opacity: 0;
    padding: 15px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: #6F9575;
    color: white;
    font-size: 14px;
    text-transform: uppercase;
    border-radius: 10px;
    position: absolute;
    top: 80%;
    left: 75%;
    transition: 0.3s ease-in-out;
}

.container-commande:hover .button-details {
    opacity: 1;
}
</style>