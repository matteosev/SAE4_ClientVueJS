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
        <h1 class="cart-title">Votre Panier Civilité Nom</h1>
    <div class="cart-wrapper">
      <div class="cart-container">
        <CartItem v-for="line of cartStore.lines" :variante="line.variante" :quantity="line.quantity"></CartItem>
      </div>
      <div class="checkout">
        <button @click="purchase" class="buy-now-btn">Acheter maintenant</button>
      </div>
    </div>
  </main>
    <footer>
        footer
    </footer>
</template>

<style scoped>
*{
    font-family: 'Space-Grotesk-bold';
}
.cart-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--first-color);
    margin: 1rem 0;
  }
.cart-wrapper {
    max-width: 1200px;
    margin: 0 auto;
  }

  .cart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }

.checkout {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.buy-now-btn {
  background-color: var(--first-color);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.buy-now-btn:hover {
  background-color: grey;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>