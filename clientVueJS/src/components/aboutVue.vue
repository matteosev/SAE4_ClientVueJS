<template>
    <main>
        <div class="img">
            <img id="img1" src="../assets/About_image.jpg" alt="">
            <img id="img2" src="../assets/About_image2.jpg" alt="">
        </div>
        
        <div class="about_infos">
            <h1 class="about_titre">Miliboo</h1>
            <p>Notre entreprise française de vente de mobilier est fière de mettre l'accent sur la qualité exceptionnelle de nos produits et matériaux. Nous sommes convaincus que les meubles ne doivent pas seulement être beaux, mais aussi durables et résistants pour durer dans le temps. C'est pourquoi nous travaillons uniquement avec des fournisseurs de matériaux haut de gamme et des artisans expérimentés pour garantir la qualité de chaque pièce de mobilier que nous proposons. Que ce soit pour votre maison ou votre bureau, nous sommes là pour vous offrir des meubles durables et de qualité qui répondent à toutes vos attentes en matière de design et de confort.</p>
        </div>
    </main>
    
    
</template>

<style scoped>  

    main{
        display: flex;
        height: 90vh;
        align-items: center;
        justify-content: center;
    }
    img{
        height: 80vh;
        border: solid  black;
    }  
    #img1{
        border-right: none;
    }  

    .about_infos{
        height: 90vh;
        margin-left: 2vw;
    }

    .about_infos p{
        width:30vw;
    }
    
    .about_titre{
        width: fit-content;
        font-size: 113px;
        margin-right: 2vw;
        background: -webkit-linear-gradient(0.5turn, #333,var(--first-color)); /* Code pour la couleur dans le titre */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        height: fit-content;
    }
   

</style>