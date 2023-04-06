import jwtDecode from 'jwt-decode';
import axios from './axios.js';


export const fetchDataClient = async (token) => {
    try {
        const decodeToken = jwtDecode(token)
        const user = []
        const responseClient = await axios.get("api/clients/getbyemail/" + decodeToken.sub)
        user.push(responseClient.data);
        if (localStorage.getItem('client'))
            localStorage.removeItem('client')
        localStorage.setItem('client', JSON.stringify(user[0]))
        console.log("reload Data")

    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}

export const fetchDataAdresseClient = async () => {
    try {
        const adresse = []
        const user = JSON.parse(localStorage.getItem('client'))

        const responseAdresse = await axios.get("api/adresses/getbyId/" + user.adresseId)
        adresse.push(responseAdresse.data);

        localStorage.setItem('adresseClient', JSON.stringify(adresse[0]))

    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}


export const fetchDataCbClient = async () => {
    try {
        const cb = []
        const user = JSON.parse(localStorage.getItem('client'))

        const reponseCb = await axios.get("api/CarteBancaire/GetCarteBanquaireByClientId/" + user.clientId)
        cb.push(reponseCb.data)

        localStorage.setItem('cbClient', JSON.stringify(cb[0]))

        console.log("reload data")
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}
export default {
    fetchDataClient,
    fetchDataAdresseClient,
    fetchDataCbClient
  };
  