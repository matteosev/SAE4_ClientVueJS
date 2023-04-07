import { defineStore } from "pinia";
import axios from 'axios';

export const useOrderStore = defineStore("order", {
    state: () => {
        return {
            express: false,
            collect: false,
            details: '',
            address: {
                street: '',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
                remarks: ''
            }
        };
    },
    actions:
    {
    },
    getters:
    {
    },
});