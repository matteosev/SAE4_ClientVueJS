// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://apimiliboo.azurewebsites.net/',
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
