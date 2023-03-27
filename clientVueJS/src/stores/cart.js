import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => {
        return {
            lines: localStorage.getItem('cartLines') == "undefined" || localStorage.getItem('cartLines') == "null" ? [] : JSON.parse(localStorage.getItem('cartLines'))
        };
    },
    actions:
    {
        addLine(line) {
            this.lines.push(line)   // line : {variante, quantity}
        },

        deleteLine(lineId) {
            this.lines.splice(lineId, 1)
        },

        increaseLineQuantity(lineId, increaseBy = 1) {
            this.lines[lineId].quantity += increaseBy
        },

        decreaseLineQuantity(lineId, decreaseBy = 1) {
            this.lines[lineId].quantity -= decreaseBy
        },

        findLineId(varianteIdToFind) {
            return this.lines.findIndex(l => l.variante.varianteId == varianteIdToFind)
        },

        addItem(itemVariante, itemQuantity) {
            let lineId = this.findLineId(itemVariante.varianteId);
            if (lineId == -1)
                this.addLine({ variante: itemVariante, quantity: itemQuantity });
            else
                this.increaseLineQuantity(lineId, itemQuantity);
        }
    },
    getters:
    {
        allLines: () => {
            return this.lines;
        }
    },
});