<!-- login.vue -->
<template>
  <div class="box-form">
    <div class="left">
      <div class="overlay">
        <h1>Miliboo</h1>
        <span>
          <a href="#" @click.prevent="handleGoogleLogin">
            <i class="fa fa-google" aria-hidden="true"></i> Se connecter avec google
          </a>
        </span>
      </div>
    </div>

    <div class="right">
      <div>
        <h5>Connexion</h5><br>
        <p>Toujours pas de compte? <a href="/creer-compte">Créer un compte</a> cela ne prend qu'une minute !</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="inputs">
          <input type="email" v-model="credentials.email" placeholder="Email">
          <br>
          <input type="password" v-model="credentials.password" placeholder="Password">
        </div>
        <!-- Ajoutez ces lignes sous les inputs de votre formulaire -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <br><br>

        <br>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../api/auth.js';
import { useCartStore } from '../../stores/cart.js';
import axios from '../../api/axios.js';
import Swal from 'sweetalert2';
import { gapi } from "gapi-script";
import { onMounted } from 'vue';
import { fetchDataClient } from '../../api/client'


export default {
  props: ['redirectURL'],
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      errorMessage: '', // Ajouter cette ligne
    };
  },
  setup() {
    const router = useRouter();
    const auth = useAuthStore();
    onMounted(async () => {
      await gapi.load('client:auth2', async () => {
        await gapi.client.init({
          clientId: '175838006198-4o9nb34echkd7f83pufc00s2uegi7dle.apps.googleusercontent.com',
          scope: 'profile email',
        });
      });
    });
    return { router, auth };
  },
  methods: {
    async handleSubmit() {
      try {
        const base64Password = btoa(this.credentials.password);
        const encodedCredentials = {
          email: this.credentials.email,
          password: base64Password,
        };

        console.log(encodedCredentials);
        await this.auth.login(encodedCredentials);

        if (this.$route.query.redirectURL == undefined)
          this.$route.query.redirectURL = "/";

        if (this.auth.isAuthenticated) {
          useCartStore().getCartFromDb(JSON.parse(localStorage.getItem("client")).clientId);
          this.$router.push({ path: decodeURIComponent(this.$route.query.redirectURL) });
        }

      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Erreur!',
          text: 'Identifiants ou mot de passe inccorect(s)',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    },
    async handleGoogleLogin() {
      try {
        const googleUser = await gapi.auth2.getAuthInstance().signIn();
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;

        // Envoyer l'ID token au serveur pour vérifier l'existence du client
        const response = await axios.post('/api/login/GoogleResponse', {
          email: profile.getEmail(),
        });

        if (response.status === 200) {
          // Si l'utilisateur existe déjà, connectez-vous
          if (response.data.userExists) {
            // Stocker le token JWT et les détails de l'utilisateur
            this.auth.token = response.data.token;
            this.auth.userDetails = response.data.userDetails;
            localStorage.setItem('token', this.auth.token);
            console.log(this.$route.query.redirectURL)
            if (this.$route.query.redirectURL == undefined)
              this.$route.query.redirectURL = "/";
            this.$router.push({ path: decodeURIComponent(this.$route.query.redirectURL) })
            await fetchDataClient(localStorage.getItem('token'))
          }
        } else {
          // Si l'utilisateur n'existe pas, redirigez-le vers la page d'inscription
          this.$router.push({ path: "/creer-compte" })
        }
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    }
  },
};



</script>


  
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

body {
  background-image: linear-gradient(135deg, #FAB2FF 10%, #1904E5 100%);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: "Open Sans", sans-serif;
  color: #333333;
  height: 100vh;
  display: flex;
  align-items: center;
}

.box-form {
  margin: 5% auto;
  width: 100%;
  max-width: 900px;
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex: 1 1 100%;
  align-items: stretch;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

@media (max-width: 980px) {
  .box-form {
    flex-flow: wrap;
    text-align: center;
    align-content: center;
    align-items: center;
  }
}

.box-form div {
  height: auto;
}

.box-form .left {
  color: #FFFFFF;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../../assets/login_image.jpeg");
  overflow: hidden;
}

.box-form .left .overlay {
  padding: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.box-form .left .overlay h1 {
  font-size: 6vmax;
  line-height: 1;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px;
}

.box-form .left .overlay span p {
  margin-top: 15px;
  font-weight: 900;
}

.box-form .left .overlay span a {
  background: grey;
  color: #FFFFFF;
  margin-top: 10px;
  padding: 10px 40px;
  border-radius: 100px;
  display: inline-block;
  box-shadow: 0 3px 6px 1px black;
  transition: 0.3s ease-in-out;
}

.box-form .left .overlay span a:hover {
  transform: scale(1.05);
}

.box-form .left .overlay span a:last-child {
  background: grey;
  margin-left: 15px;
}

.box-form .right {
  padding: 30px;
  overflow: hidden;

}

@media (max-width: 980px) {
  .box-form .right {
    width: 100%;
  }
}

.box-form .right h5 {
  font-size: 3vmax;
  line-height: 0;
}

.box-form .right p {
  font-size: 14px;
  color: #B0B3B9;
}

.box-form .right .inputs {
  overflow: hidden;
}

.box-form .right input {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 2px solid #B0B3B9;
}

.box-form .right .remember-me--forget-password {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.box-form .right .remember-me--forget-password input {
  margin: 0;
  margin-right: 7px;
  width: auto;
}

.box-form .right button {
  float: right;
  color: #fff;
  font-size: 16px;
  padding: 12px 35px;
  border-radius: 50px;
  display: inline-block;
  border: 0;
  outline: 0;
  box-shadow: 0px 4px 20px 0px grey;
  background-image: -webkit-linear-gradient(0.5turn, #333, var(--first-color));
  margin-top: 20px;
  transition: background-image 0.3s ease, box-shadow 0.3s ease;
  transition: 0.3s ease-in-out;
}

.box-form .right button:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 25px 0px grey;
  cursor: pointer;
}


label {
  display: block;
  position: relative;
  margin-left: 30px;
}

label::before {
  content: ' \f00c';
  position: absolute;
  font-family: FontAwesome;
  background: transparent;
  border: 3px solid grey;
  border-radius: 4px;
  color: transparent;
  left: -30px;
  transition: all 0.2s linear;
}

label:hover::before {
  font-family: FontAwesome;
  content: ' \f00c';
  color: #fff;
  cursor: pointer;
  background: grey;
}

label:hover::before .text-checkbox {
  background: grey;
}

label span.text-checkbox {
  display: inline-block;
  height: auto;
  position: relative;
  cursor: pointer;
  transition: all 0.2s linear;
}

label input[type="checkbox"] {
  display: none;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}

.swal2-popup {
  font-family: 'Space-Grotesk-Bold' !important;
}
</style>