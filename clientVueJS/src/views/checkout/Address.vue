<script setup>
import { useOrderStore } from '../../stores/order';
</script>

<script>
export default {
    data() {
        return {
            orderStore: useOrderStore()
        };
    },
    methods: {
        pushToPayment(){
            if (this.$refs.form.checkValidity())
                this.$router.push({ path: '/checkout/payment'});
            else
                this.$refs.form.reportValidity();
        }
        /*async submitForm() {
            try {
                // Remplacez cette URL par l'URL de votre API pour ajouter une adresse
                const apiUrl = 'https://your-api-url.com/api/adresses';
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.adresse),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de l\'ajout de l\'adresse');
                }

                const responseData = await response.json();
                console.log('Adresse ajoutée avec succès:', responseData);
                // Réinitialisez le formulaire
                this.adresse = {
                    rue: '',
                    codePostal: '',
                    ville: '',
                    pays: '',
                    telFixe: '',
                    remarques: '',
                };
            } catch (error) {
                console.error('Erreur:', error.message);
            }
        },*/
    },
};
</script>


<template>
    <div class="flex-row-center">
        <form class="flex-col" ref="form">
            <h2>Adresse de facturation/livraison</h2>

            <div class="flex-row-grow">
                <div class="flex-col">
                    <label for="street">Adresse</label>
                    <input type="text" id="street" placeholder="9 Rue de l'Arc en Ciel" required v-model="orderStore.address.street">
                </div>
                <div class="flex-col">
                    <label for="phone">Téléphone fixe (facultatif)</label>
                    <input type="text" id="phone" placeholder="01 23 45 67 89" v-model="orderStore.address.phone">
                </div>
            </div>
            
            <div class="flex-row-grow">
                <div class="flex-col">
                    <label for="state">Pays</label>
                    <input type="text" id="state" placeholder="France" required v-model="orderStore.address.country">
                </div>
                <div class="flex-col">
                    <label for="city">Ville</label>
                    <input type="text" id="city" placeholder="Annecy" required v-model="orderStore.address.city">
                </div>
                <div class="flex-col">
                    <label for="zip">Code Postal</label>
                    <input type="text" id="zip" placeholder="74940" required v-model="orderStore.address.postalCode">
                </div>
            </div>
        
            <label>
                <input type="checkbox" checked="checked" disabled> Adresse de facturation identique à l'adresse de livraison
            </label>
                
            <div class="flex-col">
                <fieldset style="padding: 10px;" class="flex-row">
                    <legend>Choisissez vos options</legend>
                    <div style="margin-right: 10px;">
                        <input type="checkbox" id="checkbox-express" v-model="orderStore.express">
                        <label for="express">Express</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkbox-relay" v-model="orderStore.collect">
                        <label for="relay">Point-Relais</label>
                    </div>
                </fieldset>
            
                <div class="flex-col">
                    <label>Instructions de livraison :</label>
                    <textarea required style="width: 100%;" rows="5" v-model="orderStore.address.remarks"></textarea>
                </div>
            </div>

            <button type="button" class="form-submit" v-on:click="pushToPayment();">Valider mon adresse</button>
        </form>
    </div>
</template>


<style scoped>
</style>