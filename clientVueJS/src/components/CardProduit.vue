
<script>
export default {
    props: ['id', 'libelle'],
    data() 
    {
        return {
            urlProduit: "/produit/" + this.id
        };
    }
}
</script>

<template>
    <div>
        <h1>{{ libelle }}</h1>
        <a href="{{urlProduit}}">Voir le produit</a>
    </div>
</template>