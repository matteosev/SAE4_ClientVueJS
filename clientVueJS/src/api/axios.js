// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7259/',
  timeout: 10000, // Augmentez le délai d'attente, par exemple à 10000 ms (10 secondes)
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
