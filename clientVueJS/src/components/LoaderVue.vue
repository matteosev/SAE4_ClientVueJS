<template>
    <div id="page">
        <div id="container">
            <h1>Chargement de la page</h1>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
#page{
    z-index: 100000000;
    width: 100%;
    height: 100%;
    position: fixed;
    
    top: 0px;
    left: 0px;

    background: white;
}
#container{
    position: fixed;
    width: 100%;
    top: 50%;
    height: auto;
    transform: translate(0%, -50%);
    
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1{
    background: -webkit-linear-gradient(0.5turn, #333,var(--first-color)); /* Code pour la couleur dans le titre */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    font-size: calc(100vw/32);
}

.lds-ellipsis {
    position: relative;
    display: flex;

    width: 80px;
    height: 80px;

    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}
.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    
    background: -webkit-linear-gradient(0.5turn, #333,var(--first-color)); /* Code pour la couleur dans le titre */


}
.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
}
</style>