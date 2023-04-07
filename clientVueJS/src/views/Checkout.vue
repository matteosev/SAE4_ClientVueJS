<script setup>  
import axios from 'axios';
import { useOrderStore } from '../stores/order';
</script>

<script>

export default {
    props: [],
    data() 
    {
        return {
            client: JSON.parse(localStorage.getItem("client"))
        };
    },
    created()
    {
    },
    mounted()
    {
    },
    computed:
    {
    },
    methods: 
    {
    }
}
</script>

<template>
    <main>
        <h1>Passez votre commande {{ client.civilite }} {{ client.nomClient }}</h1>
        <RouterView />
    </main>
</template>

<style scoped>

main { padding: 10px; }

h1 {
    padding: 10px;
    text-align: center;
}

/* /deep/ permet d'appliquer ce style à ce composant et ses enfants */
:deep(h2) {
    padding: 10px;
    text-align: center;
}

:deep(a), :deep(form > button) {
    color: white;
    background-color: var(--first-color);
    text-decoration: none;
    padding: 10px;
    border: 1px white solid;
    border-radius: 5px;
}

:deep(form > button){
    margin-top: 10px;
}

:deep(input), :deep(textarea) {
    resize: none;
    font-size: 1rem;
    border: 1px solid #495057;
    border-radius: 0.25rem;
    color: #495057;
    transition: all 0.3s ease;
    resize: none;
}

:deep(label) {
    padding: 5px 0 3px 0;
    color: #495057;
    font-size: 110%;
}

:deep(input:focus), :deep(textarea:focus) {
    outline: none;
    border-color: #80bdff;
    background-color: #fff;
    box-shadow: 0 0 0 0.2rem #5271409F;
}

:deep(form) {
    background-color: #ffffff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 700px;
    animation: slideIn 0.8s ease;
}

:deep(form > h2) {
    text-align: center;
}

@keyframes slideIn {
    0% {
        opacity: 0;
        transform: translateY(-1rem);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

:deep(.footer-nav){
    padding: 5px;
}
</style>