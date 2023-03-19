<template>

    <main>
        <form @submit.prevent="handleSubmit" >
            <h3>Connection</h3>
            <div class="form_container">
                

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="credentials.email" placeholder="Email"/>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="credentials.password" placeholder="Password"/>
                </div>

                
            </div>
            

            <button class="btn btn-primary btn-block">Se connecter</button>


        </form>
    </main>
    
</template>
  
<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../api/auth';
import axios from '../api/axios';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
    };
  },
  setup() {
    const router = useRouter();
    const auth = useAuthStore();

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

        if (this.auth.isAuthenticated) {
          // Le token JWT a été reçu, les informations d'identification sont correctes
          this.router.push('/');
        } else {
          // Les informations d'identification sont incorrectes. Affichez un message d'erreur à l'utilisateur.
        }
      } catch (error) {
        console.error('Erreur de connexion:', error);
        // Affichez un message d'erreur à l'utilisateur.
      }
    },
  },
};
</script>

<style scoped>
    main{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    form{
        width: fit-content;
        padding: 2%;
        border-radius: 8px;
        background-color: var(--first-color);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .form_container{
        margin: 15px;
    }
    .form-group{
        display: flex;
        justify-content: space-between;
    }
    
</style>