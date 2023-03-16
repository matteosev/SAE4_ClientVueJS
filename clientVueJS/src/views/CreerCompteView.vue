<template>

    <main>
        <form @submit.prevent="handleSubmit" >
            <h3>Inscription</h3>
            <div class="form_container">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="first_name" placeholder="First Name"/>
                </div>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="last_name" placeholder="Last Name"/>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="email" placeholder="Email"/>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="password" placeholder="Password"/>
                </div>

                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirm Password"/>
                </div>
            </div>
            

            <button class="btn btn-primary btn-block">S'inscrire</button>


        </form>
    </main>
    
</template>
  
<script>
    export default{
        name: 'Register',
        data(){
            return{
                first_name:'',
                last_name:'',
                email:'',
                password:'',
                password_confirm:''
            }
        },
        methods:{
            handleSubmit(){
                const data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password,
                    password_confirm: this.password_confirm
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