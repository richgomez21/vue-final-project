<template>
    <div class="user-list">
        <button type="button" class="btn btn-dark" @click="$router.push({name: 'AddUser' })">Add New User</button>
        <br><br>
        <table align="center" class="table table-hover table-dark">
            <thead>
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Active</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in users" :key="u.id">
                    <td>{{u.firstName + " " + u.lastName}}</td>
                    <td>{{u.email}}</td>
                    <td>{{getRoleNameById(u.roleId)}}</td>
                    <td>{{u.active ? "yes" : "no"}}</td>
                    <td>
                        <button type="button" class="btn btn-secondary" @click="editUser(u.id)">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {getAllUsers, getAllRoles} from "@/api"

export default {
    data(){
        return {
            users: [],
            roles:[]
        }
    },
    mounted(){
        getAllUsers().then(users => this.users = users);
        getAllRoles().then(roles => this.roles = roles);
    },
    methods:{
        getRoleNameById(id){
          const role = this.roles.find(r => r.id == id);
          return role?.name;
          // Note the nullish operator - I noticed that this method gets called even before the roles have been fetched!
        },
        editUser(id){
        this.$router.push({name:'UserDetails', params: {userId:id}});
        }
    }
}
</script>

<style>
 
</style>
