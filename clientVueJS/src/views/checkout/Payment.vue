<script setup>
import { useOrderStore } from '../../stores/order';
import { useCartStore } from '../../stores/cart';
</script>

<script>
export default {
    props: [],
    data() 
    {
        return {
            client: JSON.parse(localStorage.getItem("client")),
            cartStore: useCartStore(),
            orderStore: useOrderStore()
        };
    },
    created()
    {
        console.log(this.orderStore)
    },
    mounted()
    {
    },
    computed:
    {
    },
    methods: 
    {
        postCommand(){
            if (this.$refs.form.checkValidity())
            {
                this.cartStore.cartToOrder();
                this.cartStore.emptyCart();
                this.$router.push({ path: '/'});
            }
            else
                this.$refs.form.reportValidity();
        }
    }
}
</script>

<template>
    <div class="flex-row-center">
        <form class="flex-col" ref="form">
            <h2>Carte Bancaire</h2>
            <div class="flex-row-grow">
                <div class="flex-col">
                    <label for="cname">Nom</label>
                    <input type="text" id="cname" placeholder="La Kiffance" required>
                </div>
                <div class="flex-col">
                    <label for="csurname">Prénom</label>
                    <input type="text" id="csurname" placeholder="Maxance" required>
                </div>
            </div>

            <label for="ccnum">Numéro</label>
            <input type="text" id="ccnum" placeholder="1111-2222-3333-4444" required>

            <div class="flex-row-grow">
                <div class="flex-col">
                    <label for="expmonth">Expiration</label>
                    <input type="text" id="exp" placeholder="01/99" required>
                </div>
                <div class="flex-col">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="352" required>
                </div>
            </div>
            <button type="button" class="form-submit" v-on:click="postCommand();">Payer</button>
        </form>
    </div>

    <div class="flex-row-center">
        <RouterLink to="/checkout/address">&lt Adresse</RouterLink>
    </div>
</template>

<style scoped>
</style>