<script setup>
import axios from 'axios';
</script>

<script>
export default {
    props: ['avis'],
    data()
    {
        return {
        };
    },
    created()
    {
    },
    methods:
    {
    }
}
</script>

<template>
    <div>
        <div id="avisHeader">
            <h3>{{ avis.titre }}</h3>
            <div>
                <span v-for="i of [1,2,3,4,5]" class="dot" :class="[i <= avis.note ? 'dotChecked' : '']"></span>
            </div>
        </div> 
        <p>{{ avis.texte }}</p>
        <div id="avisFooter">
            <p>{{ new Date(avis.date).toLocaleDateString('fr-FR') }}</p>
            <p>{{ avis.clientId }}</p>
        </div> 
    </div>
</template>

<style>

#avisHeader { display: flex; }
#avisHeader > h3 { flex-grow: 1; }
#avisFooter { display: flex; }
#avisFooter > p:first-child { flex-grow: 1; }

.dot{
    height: 1em;
    width: 1em;
    background-color: rgba(0,0,0, 0.2);
    border-radius: 50%;
    display: inline-block;
}

.dotChecked { background-color: var(--first-color); }
</style>