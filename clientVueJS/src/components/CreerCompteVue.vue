<template>
    <div class="center-form">
    <div class="form_container">
      <form @submit.prevent="handleSubmit">
        <h3>Inscription</h3>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="registrationData.email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="registrationData.password" required />
        </div>
        <div class="form-group">
          <label for="nom">Nom:</label>
          <input type="text" id="nom" v-model="registrationData.nomClient" required />
        </div>
        <div class="form-group">
          <label for="prenom">Prénom:</label>
          <input type="text" id="prenom" v-model="registrationData.prenomClient" required />
        </div>
        <div class="form-group">
          <label for="portable">Portable:</label>
          <input type="text" id="portable" v-model="registrationData.portable" required />
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="registrationData.newsletterMiliboo" />
            Recevoir la newsletter Miliboo
          </label>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="registrationData.newsletterPartenaire" />
            Recevoir la newsletter des partenaires
          </label>
        </div>
        <div class="form-group">
          <label for="civilite">Civilité:</label>
          <select id="civilite" v-model="registrationData.civilite">
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
          </select>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
</div>
  </template>

<script setup>
import { ref } from 'vue';
import axios from '../api/axios';

const registrationData = ref({
  email: '',
  roleClient: 'Admin',
  password: '',
  nomClient: '',
  prenomClient: '',   
  portable: '',
  newsletterMiliboo: false,
  newsletterPartenaire: false,
  soldeFildelite: 0,
  civilite: 'Monsieur',
});

function encryptPassword(password) {
  const utf8Array = new TextEncoder().encode(password);
  const base64String = btoa(String.fromCharCode(...utf8Array));
  return base64String;
}

async function handleSubmit() {
  try {
    const encryptedPassword = encryptPassword(registrationData.value.password);
    const dataToSend = { ...registrationData.value, password: encryptedPassword };
    console.log(dataToSend);
    const response = await axios.post('api/Clients/Post', dataToSend, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 201) {
      alert('Inscription réussie !');
    } else {
      alert("Une erreur est survenue lors de l'inscription.");
    }
  } catch (error) {
    console.error(error);
    alert("Une erreur est survenue lors de l'inscription.");
  }
}

</script>

<style scoped>
    .center-form {
        display: flex;
        align-items: center;
        justify-content: center;
}

main{
    display: flex;
    align-items: center;
    justify-content: center;
}
.form_container {
  width: fit-content;
  margin: 15px;
}

form{
        width: fit-content;
        padding: 2%;
        border-radius: 7px;
        background-color: var(--third-color);
        border: solid 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form-group{
        display: flex;
        justify-content: space-between;
        margin: 4px;
    }
    input{
        border-radius: 7px;
        border: solid var(--first-color);
    }

    button{
        background-color: var(--first-color);
        color: #FFF;
    }

</style>