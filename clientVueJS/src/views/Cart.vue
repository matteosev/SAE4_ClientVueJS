<script setup>  
import axios from 'axios';
import { useCartStore } from '../stores/cart';
import CartItem from '../components/CartItem.vue'
</script>

<script>

export default {
    props: [],
    data() 
    {
        return {
            cartStore: useCartStore()
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
        <CartItem v-for="line of cartStore.lines" :variante="line.variante" :quantity="line.quantity"></CartItem>
    </main>
    <footer>
        footer
    </footer>
</template>

<style scoped>
</style>