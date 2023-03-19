// // src/store/auth.js
// import { defineStore } from 'pinia';
// import axios from '../api/axios';
// import jwtDecode from 'jwt-decode';

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     token: null,
//     userDetails: null
//   }),
//   actions: {
//     async login(credentials) {
//       try {
//         const response = await axios.post('Login', credentials);
//         if (response.data.token) {
//           this.token = response.data.token;
//           this.userDetails = response.data.userDetails;
//           localStorage.setItem('token', this.token);
//         }
//       } catch (error) {
//         console.error('Error during authentication:', error);
//         throw error;
//       }
      
//     },
//     logout() {
//       this.token = null;
//       this.userDetails = null;
//       localStorage.removeItem('token');
//     }
//   },
//   getters: {
//     isAuthenticated() {
//       return !!this.token;
//     }
//   }
// });
