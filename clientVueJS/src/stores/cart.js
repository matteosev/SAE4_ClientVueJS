import { defineStore } from "pinia";
import axios from '../api/axios';

export const useCartStore = defineStore("cart", {
    state: () => {
        return {
            lines: []
        };
    },
    actions:    // line : {variante, quantity}
    {
        // On récupère les lignesPanier (Backend) de la BD et on les met dans le panier (Frontend)
        getCartFromDb(clientId)
        {
            axios.get('/api/LignePaniers/GetLignePanierByClientId/' + clientId)
            .then(response =>
            {
                for (let lignePanier of response.data)
                {
                    axios.get('/api/Variantes/GetVarianteById/' + lignePanier.varianteId)
                    .then(response => {
                        this.addLine({
                            lignePanierId: lignePanier.lignePanierId,
                            variante: {
                                varianteId: lignePanier.varianteId,
                                produitId: response.data.produitId,
                                prix: response.data.prix
                            },
                            quantity: lignePanier.lignePanierQuantite 
                        });
                    });
                }
            })
        },

        /* Les méthodes suivantes modifient SEULEMENT LE PANIER (FRONTEND) */
        addLine(line) { this.lines.push(line) },

        deleteLine(lineId) { this.lines.splice(lineId, 1) },

        deleteAllLines(){ this.lines = [] },

        findLineId(varianteIdToFind) {
            return this.lines.findIndex(l => l.variante.varianteId == varianteIdToFind)
        },

        /* Les méthodes suivantes modifient SEULEMENT LES LIGNEPANIER (BACKEND) */
        postLine(lineId)
        {
            let lignePanier = { 
                clientId: JSON.parse(localStorage.getItem("client")).clientId, 
                varianteId: this.lines[lineId].variante.varianteId, 
                lignePanierQuantite: this.lines[lineId].quantity,
                dateDerniereModif: new Date().toISOString(),
                lignePanier_Client: null,
                lignePanier_Variante: null
            };
            axios.post("/api/LignePaniers/Post", lignePanier)
            .then(response => {
                this.lines[lineId].lignePanierId = response.data.lignePanierId;
            });
        },

        postCart()
        {
            for (let line of this.lines)
                this.postLine(line);
        },

        /* Les méthodes suivantes modifient LE PANIER (FRONTEND) ET  LES LIGNEPANIER (BACKEND) */
        addItem(itemVariante, itemQuantity) {
            let lineId = this.findLineId(itemVariante.varianteId);
            if (lineId == -1)
            {
                let line = { variante: itemVariante, quantity: itemQuantity };
                this.addLine(line);
                this.postLine(this.lines.length - 1);
            }
            else
                this.updateItemQuantity(itemVariante, itemQuantity);
        },

        updateItemQuantity(itemVariante, itemQuantityChange)
        {
            let lineId = this.findLineId(itemVariante.varianteId);

            if (lineId != -1)
            {
                let lignePanier = {
                    lignePanierId: this.lines[lineId].lignePanierId,
                    clientId: JSON.parse(localStorage.getItem("client")).clientId, 
                    varianteId: this.lines[lineId].variante.varianteId, 
                    lignePanierQuantite: this.lines[lineId].quantity + itemQuantityChange,
                    dateDerniereModif: new Date().toISOString(),
                    lignePanier_Client: null,
                    lignePanier_Variante: null
                };
                axios.put("/api/LignePaniers/Put/" + lignePanier.lignePanierId, lignePanier).then(response => console.log(response));
                this.lines[lineId].quantity += itemQuantityChange;
            }
            else
                this.addItem(itemVariante, itemQuantityChange);
        },

        deleteItem(itemVariante) {
            let lineId = this.findLineId(itemVariante.varianteId);
            if (lineId != -1)
            {
                axios.delete("/api/LignePaniers/Delete/" + this.lines[lineId].lignePanierId);
                this.deleteLine(lineId);
            }
        },

        emptyCart(){
            for (let i = this.lines.length - 1; i >= 0; i--) {
                axios.delete("/api/LignePaniers/Delete/" + this.lines[i].lignePanierId);
                this.deleteLine(i);
            }
        },

        // Transformer le panier en commande
        cartToOrder()
        {
            let order = {
                clientId: JSON.parse(localStorage.getItem("client")).clientId,
                adresseId: 1,
                commandeExpresse: false,
                commandeCollect: false,
                commandePointsFideliteUtilises: 0,
                commandeInstructions: "ncjksn",
                etat: 0
            }
            axios.post("/api/Commandes/Post", order)
            .then(response => {
                for (let lp of this.lines){
                    let ligneCommande = {
                        varianteId: lp.variante.varianteId,
                        commandeId: response.data.commandeId,
                        quantite: lp.quantity,
                        ligneCommande_Variante: null,
                        ligneCommande_Commande: null
                    }
                    console.log(JSON.stringify(ligneCommande));
                    axios.post("/api/LigneCommandes/Post", ligneCommande)
                    .then(response => {console.log(response.data)})
                }
                console.log(response.data);
            });
        }
    },
    getters:
    {
        totalAmount(){
            let amount = 0;
            for (let line of this.lines)
                amount += line.variante.prix * line.quantity;
            return amount;
        }
    },
});