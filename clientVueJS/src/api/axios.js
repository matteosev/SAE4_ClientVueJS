// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7259/',
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
