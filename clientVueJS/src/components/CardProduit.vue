
<script>
export default {
    props: ['id', 'libelle'],
    data() 
    {
        return {
        };
    }
}
</script>

<template>
    <div>
        <h1>{{ libelle }}</h1>
        <RouterLink :to="{ name: 'produit', params: { id: this.id }}">Voir le produit</RouterLink>
    </div>
</template>