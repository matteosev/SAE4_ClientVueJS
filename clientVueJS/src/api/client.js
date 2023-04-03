import jwtDecode from 'jwt-decode';
import axios from './axios.js';


export default async function fetchDataClient(token) {
    try {
        const decodeToken = jwtDecode(token)
        const user = []
        const responseClient = await axios.get("api/clients/getbyemail/" + decodeToken.sub)
        user.push(responseClient.data);
        if (localStorage.getItem('client'))
            localStorage.removeItem('client')
        localStorage.setItem('client', JSON.stringify(user[0]))

    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}

export async function fetchDataAdresseClient() {
    try {
        const adresse = []
        const user = JSON.parse(localStorage.getItem('client'))
        console.log(user)

        const responseAdresse = await axios.get("api/adresses/getbyId/" + user.adresseId)
        adresse.push(responseAdresse.data);
        if (localStorage.getItem('adresseClient'))
            localStorage.removeItem('adresseClient')
        localStorage.setItem('adresseClient', + JSON.stringify(adresse[0]))

    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
}

export async function addAdresseClient(adresse, clientId){
    
    const responseAddAdresse = await axios.post("api/adresses/post/")
}
