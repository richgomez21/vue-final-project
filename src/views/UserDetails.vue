<template>
    <div v-if="user">
        <form @submit.prevent="onSubmit">
            <div>
                <label>First Name:</label>
                <input v-model="user.firstName" />
                <div class="validation">{{ errors.firstName }}</div>
            </div>
            <div>
                <label>Last Name:</label>
                <input v-model="user.lastName" />
                <div class="validation">{{ errors.lastName }}</div>
            </div>
            <div>
                <label>Email:</label>
                <input v-model="user.email" />
                <div class="validation">{{ errors.email }}</div>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" v-model="user.password" />
                <div class="validation">{{ errors.password }}</div>
            </div>
            <div>
                <label>Role:</label>
                <select v-if="roles.length > 0" v-model="user.roleId">
                	<option v-for="r in roles" :key="r.id" :value="r.id">{{r.name}}</option>
                </select>
            </div>
            <div>
                <label>Active:</label>
                <input type="checkbox" v-model="user.active">
            </div>
            <div>
                <input type="submit" id="btnSubmit" name="submit button">
                <input type="button" @click="$router.push({name:'UserList'})" value="Cancel">
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

        getAllRoles().then(roles => this.roles = roles);

        if(this.userId > 0){
            getUserById(this.userId).then(user => this.user = user);
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
label{ display: block; }
.validation{color: rgb(172, 16, 16); font-weight: bold;}
</style>
