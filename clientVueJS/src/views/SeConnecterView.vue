<template>

    <main>
        <form @submit.prevent="handleSubmit" >
            <h3>Connection</h3>
            <div class="form_container">
                

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="email" placeholder="Email"/>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="password" placeholder="Password"/>
                </div>

                
            </div>
            

            <button class="btn btn-primary btn-block">Se connecter</button>


        </form>
    </main>
    
</template>
  
<script>
    export default{
        name: 'Register',
        data(){
            return{
                email:'',
                password:''
            }
        },
        methods:{
            handleSubmit(){
                const data = {
                    email: this.email,
                    password: this.password
                }
                console.log(data);
            }
        }
    }
</script>

<style>
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