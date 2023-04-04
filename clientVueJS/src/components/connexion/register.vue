<!-- register.vue -->
<template>
  <div class="box-form">
    <div class="left">
      <div class="overlay">
        <h1>Miliboo</h1>
        <span>
          <p>
            <a href="#" @click.prevent="handleGoogleSignIn"><i class="fa fa-google" aria-hidden="true"></i> S'inscrire
              avec google</a>
          </p>
        </span>
      </div>
    </div>



    <div class="right">
      <template v-if="!showAdditionalInfoForm">
        <h5>Inscription</h5><br>
        <p>Déjà membre? <a href="/se-connecter">Se connecter</a> </p>
        <form @submit.prevent="handleSubmit">
          <div class="inputs">
            <input type="email" v-model="registrationData.email" placeholder="Email" required>
            <br>
            <input type="password" v-model="registrationData.password" @input="checkPasswordLength"
              placeholder="Mot de passe" required>
            <span class="password-error" v-if="passwordError">Le mot de passe doit comporter au moins 9 caractères</span>
            <br>
            <input type="text" v-model="registrationData.nomClient" placeholder="Nom" required>
            <br>
            <input type="text" v-model="registrationData.prenomClient" placeholder="Prénom" required>
            <br>
            <input type="text" v-model="registrationData.portable" placeholder="Portable" required>
            <br>
            <select id="civilite" v-model="registrationData.civilite" required>
              <option value="" disabled selected hidden>Civilité</option>
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
            </select>
            <br>
            <label>
              <input type="checkbox" v-model="registrationData.newsletterMiliboo">
              <span class="checkmark"></span>
              <span class="label-text">Recevoir la newsletter Miliboo</span>
            </label>
            <br>
            <label>
              <input type="checkbox" v-model="registrationData.newsletterPartenaire">
              <span class="checkmark"></span>
              <span class="label-text">Recevoir la newsletter des partenaires</span>
            </label>
          </div>

          <br>
          <button type="submit">S'inscrire</button>
        </form>
      </template>

      <template v-else>
        <h5>Un instant...</h5><br>
        <p>Connecté avec Google? <a href="/se-connecter">Se connecter</a> </p>
        <form @submit.prevent="handleAdditionalInfoSubmit">
          <input type="text" v-model="googleRegistrationData.portable" placeholder="Portable" required>
          <br>
          <select id="civilite" v-model="googleRegistrationData.civilite" required>
            <option value="" disabled selected hidden>Civilité</option>
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
          </select>
          <br>
          <button type="submit">Finaliser l'inscription</button>
        </form>
      </template>
    </div>
  </div>
</template>




<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../api/axios';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { gapi } from "gapi-script";
import { useAuthStore } from '../../api/auth.js';

onMounted(async () => {
  await gapi.load('client:auth2', async () => {
    await gapi.client.init({
      clientId: '175838006198-4o9nb34echkd7f83pufc00s2uegi7dle.apps.googleusercontent.com',
      scope: 'profile email',
    });
  });
});

function generateRandomPassword(length = 12) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


const showAdditionalInfoForm = ref(false);
const auth = useAuthStore();
const router = useRouter();
const passwordError = ref(false);
const registrationData = ref({
  email: '',
  roleClient: 'Client',
  password: '',
  nomClient: '',
  prenomClient: '',
  portable: '',
  newsletterMiliboo: true,
  newsletterPartenaire: true,
  soldeFildelite: 0,
  civilite: '',
});
const googleRegistrationData = ref({
  email: '',
  roleClient: 'Client',
  password: generateRandomPassword(),
  nomClient: '',
  prenomClient: '',
  portable: '',
  newsletterMiliboo: true,
  newsletterPartenaire: true,
  soldeFildelite: 0,
  civilite: '',
});




function checkPasswordLength() {
  passwordError.value = registrationData.value.password.length < 9
}

async function handleGoogleSignIn() {
  try {
    const authInstance = gapi.auth2.getAuthInstance();
    const googleUser = await authInstance.signIn();

    const profile = googleUser.getBasicProfile();

    googleRegistrationData.value.email = profile.getEmail();
    googleRegistrationData.value.nomClient = profile.getFamilyName();
    googleRegistrationData.value.prenomClient = profile.getGivenName();

    showAdditionalInfoForm.value = true;
  } catch (error) {
    console.error('Error signing in:', error);
  }
}



async function handleSubmit() {
  try {
    const data = btoa(registrationData.value.password);
    const dataToSend = { ...registrationData.value, password: data };
    const response = await axios.post('api/Clients/Post', dataToSend, {
      headers: { 'Content-Type': 'application/json' },
    });
    Swal.fire(
      'Compte créé',
      'Bienvenue !',
      'success'
    )
    const base64Password = btoa(registrationData.value.password);
    const encodedCredentials = {
      email: registrationData.value.email,
      password: base64Password,
    }
    await auth.login(encodedCredentials);
    router.push('/');
  } catch (error) {
    Swal.fire({
      title: 'Oops...',
      text: "Une erreur est survenue lors de l'inscription",
      icon: 'error',
      confirmButtonText: 'Ok'
    })

  }
}
async function handleAdditionalInfoSubmit() {
  console.log(googleRegistrationData.value);
  try {
    const response = await axios.post('api/Clients/Post', googleRegistrationData.value);
    localStorage.setItem('accessToken', response.data.accessToken);
    const googleUser = await gapi.auth2.getAuthInstance().signIn();
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;

    const responseConnect = await axios.post('/api/login/GoogleResponse', {
      email: profile.getEmail(),
    });

    if (responseConnect.status === 200) {
      if (responseConnect.data.userExists) {
        auth.token = responseConnect.data.token;
        auth.userDetails = responseConnect.data.userDetails;
        localStorage.setItem('token', auth.token);
        router.push('/');
      }
    }
  } catch (error) {
    Swal.fire({
      title: 'Oops...',
      text: "Une erreur est survenue lors de l'inscription",
      icon: 'error',
      confirmButtonText: 'Ok'
    });

  }
}

defineExpose({ auth });

</script>

  
  
<style scoped>
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
  background-image: url("../../assets/inscription_image.png");
  overflow: hidden;
  flex: 1;
}

.box-form .left .overlay {
  padding: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box-form .left .overlay h1 {
  font-size: 2rem;
  line-height: 1;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #FFFFFF;
}

.box-form .left .overlay span p {
  margin-top: 15px;
  font-weight: 900;
}

.box-form .left .overlay span a {
  display: block;
  margin-top: 10px;
  color: #FFFFFF;
  padding: 10px 40px;
  border-radius: 100px;
  background: grey;
  box-shadow: 0 3px 6px 1px black;
  transition: 0.3s ease-in-out;
}

.box-form .left .overlay span a:hover {
  transform: scale(1.05);
}


.box-form .right {
  padding: 30px;
  overflow: hidden;
  flex: 1;
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

.box-form .right input,
.box-form .right select {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 2px solid #B0B3B9;
}

.box-form .right .password-error {
  color: red;
  font-size: 14px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  margin-right: 10px;
}

.checkmark {
  position: relative;
  height: 16px;
  width: 16px;
  background-color: #eee;
  border: 2px solid grey;
  border-radius: 4px;
  margin-right: 10px;
}

.label-text {
  flex: 1;
}


.checkbox-container:hover input~.checkmark {
  background-color: #ccc;
}

.checkbox-container input:checked~.checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked~.checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 5px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.box-form .right button {
  width: 100%;
  padding: 12px 20px;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: var(--first-color);
  background-color: gainsboro;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.box-form .right button:hover {
  background-color: gray;
}
</style>