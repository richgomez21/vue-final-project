<template>
     <span v-if="GStore.currentUser">
      <h3 class="greetH3">Welcome Back, {{GStore.currentUser.firstName}} {{GStore.currentUser.lastName}}.. &nbsp;</h3>
    </span>
  <nav class="bg-dark">
    <router-link :to="{name:'home'}">Home</router-link> 
      <i class="bi bi-diamond-fill"></i>
    <!-- <router-link to="/about">About</router-link> | -->
    <router-link :to="{name: 'UserList'}" v-if="GStore.currentUser?.roleId == 2">Users<i class="bi bi-diamond-fill"></i></router-link> 
      
    <router-link :to="{name: 'Artists'}" v-if="GStore.currentUser?.roleId == 2 || 1">Artists</router-link> 
      <i class="bi bi-diamond-fill"></i> 
    <router-link :to="{name: 'Albums'}" v-if="GStore.currentUser?.roleId == 2 || 1">Albums</router-link> 
      <i class="bi bi-diamond-fill"></i>
    <router-link v-if="!GStore.currentUser" :to="{name: 'Login'}">Login</router-link>
    <a v-else @click="logout" href="#">Log Out</a>
  </nav>
  
</template>

<script>
export default {
    inject: ['GStore'],
    methods:{
        logout(evt){
            evt.preventDefault();
            this.GStore.currentUser = null;
            sessionStorage.removeItem("currentUser");
            this.$router.push({name:"Login"});
        }
    }
}
</script>

<style>




</style>