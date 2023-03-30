import { defineStore } from 'pinia';
import axios from './axios.js';
import jwtDecode from 'jwt-decode';
import { reactive, ref } from 'vue'

const useAuthStore = defineStore('auth', {

  state: () => ({
    token: localStorage.getItem('token'),
    userDetails: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
    user: ref([])
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('api/Login', credentials);
        if (response.data.token) {
          this.token = response.data.token;
          this.userDetails = response.data.userDetails;
          localStorage.setItem('token', this.token);
          await this.fetchData()
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
      }
    },
    async fetchData() {
      try {
        const decodeToken = jwtDecode(this.token)

        const responseClient = await axios.get("api/clients/getbyemail/" + decodeToken.sub)
        this.user.push(response.data);
        localStorage.setItem('client', JSON.stringify(this.user[0]))

      } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
      }

    },
    logout() {
      this.token = null;
      this.userDetails = null;
      localStorage.removeItem('token');
      localStorage.removeItem('client')
    },
  },
  getters: {
    isAuthenticated() {
      return !!this.token;
    },
  },
});

export { useAuthStore };
