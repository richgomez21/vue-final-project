<template>
    <div v-if="user">
      <form @submit.prevent="onSubmit" class="user-form">
        <div class="mb-3">
          <label for="firstName" class="form-label fw-bold">First Name:</label>
          <input v-model="user.firstName" type="text" class="form-control" id="firstName" />
          <div class="validation">{{ errors.firstName }}</div>
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label fw-bold">Last Name:</label>
          <input v-model="user.lastName" type="text" class="form-control" id="lastName" />
          <div class="validation">{{ errors.lastName }}</div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label fw-bold">Email:</label>
          <input v-model="user.email" type="email" class="form-control" id="email" />
          <div class="validation">{{ errors.email }}</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label fw-bold">Password:</label>
          <input v-model="user.password" type="password" class="form-control" id="password" />
          <div class="validation">{{ errors.password }}</div>
        </div>
        <div class="mb-3">
          <label for="roleId" class="form-label fw-bold">Role:</label>
          <select v-if="roles.length > 0" v-model="user.roleId" class="form-control" id="roleId">
            <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
          </select>
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="active" v-model="user.active" />
            <label class="form-check-label fw-bold" for="active">Active</label>
          </div>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-dark">Save</button>
          <button type="button" @click="$router.push({ name: 'UserList' })" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </template>

<script>
import {getUserById, getAllRoles, updateUser, insertUser} from "@/api"

export default {
    props:["userId"],
    data(){
        return{
            user:null,
            roles:[],
            errors:{}
        }
    },
    mounted(){

        if(this.$route.name != "AddUser" && isNaN(this.userId)){
            this.$router.push({name:"NotFound"})
        }

        getAllRoles().then(roles => this.roles = roles);

        if(this.userId > 0){
            getUserById(this.userId).then(user => this.user = user).catch(err => this.$router.push({name:"NotFound"}));
        }else{
            // if the userId prop was not passed in, then we are creating a new empty user
            this.user = {id:0, firstName:"", lastName:"", email:"", password:"", roleId:1, active: true};
        }
    },
    methods:{
        onSubmit() {
            if(this.isValid()){
                if(this.userId > 0){
                    updateUser(this.user).then(resp => {
                        this.$router.push({name: 'UserList'});
                    });
                }else{
                    insertUser(this.user).then(resp => this.$router.push({name: 'UserList'}));
                }
            }
        },
        isValid(){
            // if(!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password){
            //     return false;
            // }
            // return true;

            let valid = true;
            this.errors = {};

            if(this.user.firstName == ""){
                this.errors.firstName = "ENTER FIRST NAME";
                valid = false;
            }

            if(this.user.lastName == ""){
                this.errors.lastName = "ENTER LAST NAME";
                valid = false;
            }

            if(this.user.password == ""){
                this.errors.password = "ENTER PASSWORD";
                valid = false;
            }

            if(this.user.email == ""){
                this.errors.email = "EMAIL";
                valid = false;
            }else if(!this.validateEmailAddress(this.user.email)){
                this.errors.email = "ENTER VALID EMAIL"
                valid = false;
            }
            
            return valid;
        },
        validateEmailAddress(email){
		    var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		    return regExp.test(email);
		}
    }
}
</script>

<style scoped>
label{ 
    display: block; 
}
.validation{
    color: rgb(172, 16, 16); 
    font-weight: bold;
}

.user-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 5px solid #000000;
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

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.btn-secondary:hover {
  background-color: #5a6268;
}



</style>
