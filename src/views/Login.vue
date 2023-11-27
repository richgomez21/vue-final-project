<template>
    <div class="login-container">
      <form @submit.prevent="onSubmit" class="login-form">
        <h2 class="mb-4">Login <i class="bi bi-box-arrow-in-right"></i> </h2>
        <div class="mb-3">
          <label for="email" class="form-label ">Email:</label>
          <input v-model="email" type="email" class="form-control" id="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input v-model="password" type="password" class="form-control" id="password" required />
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-dark">Login</button>
        </div>
      </form>
    </div>
  </template>

<script>

import {login} from '../api.js'

export default {
    inject: ['GStore'],
    data(){
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        onSubmit(){
            if(this.validate()){
                login(this.email, this.password).then(user => {
                    if(user){
                        // alert("AUTHENTICATED!");
                        // console.log(user);
                        this.GStore.currentUser = user;
                        sessionStorage.setItem("currentUser", JSON.stringify(user));
                        this.$router.push({name: "home"});
                    }else{
                        alert("LOGIN FAILED!");
                    }
                }).catch((err)=>{alert(err)});
            }
        },
        validate(){
            if(!this.email || !this.password){
                alert("Invalid Input");
                return false;
            }
            return true;
        }
    }
}
</script>

<style scoped>
label{ display: block; }

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 4px solid #000000;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.btn-dark {
  background-color: #343a40;
  color: #fff;
}

.btn-dark:hover {
  background-color: #23272b;
}

.mb-4{
    font-weight: bold;
}

.form-label{
    font-weight: bold;
}
    
</style>