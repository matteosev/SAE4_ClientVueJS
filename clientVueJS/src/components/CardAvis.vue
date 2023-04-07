<script setup>
import axios from 'axios';
</script>

<script>
export default {
    props: ['avis'],
    data()
    {
        return {
            clientPseudo: ""
        };
    },
    created()
    {
        axios.get('https://localhost:7259/api/Clients/GetById/' + this.avis.clientId)
        .then(response => this.clientPseudo = response.data.prenomClient + ' ' + response.data.nomClient.charAt(0))
        .catch(error => console.error(error));
    },
    mounted()
    {
    },
    methods:
    {
    }
}
</script>

<template>
    <div class="avis">
        <div id="avisHeader">
            <h3>{{ avis.titre }}</h3> 
        </div> 
        <div>
            <span v-for="i of [1,2,3,4,5]" class="dot" :class="[i <= avis.note ? 'dotChecked' : '']"></span>
        </div>
        <p>{{ avis.texte }}</p>
        <div id="avisFooter">
            <p>{{ new Date(avis.date).toLocaleDateString('fr-FR') }}</p>
            <p>{{ clientPseudo }}</p>
            
        </div> 
        
    </div>
</template>

<style>

.avis{
    background: #E4FFDC;
    padding: 20px;
    border-radius: 10px;
    
}

.dot{
    height: 1em;
    width: 1em;
    background-color: rgba(0,0,0, 0.2);
    border-radius: 50%;
    display: inline-block;
}

.dotChecked { background-color: var(--first-color); }

#avisHeader{
    margin-bottom: 15px;
}
</style>