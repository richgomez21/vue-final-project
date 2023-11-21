<template>
  <nav>
    <span v-if="GStore.currentUser">
      <h3><b>Welcome Back, {{GStore.currentUser.firstName}} {{GStore.currentUser.lastName}}.. &nbsp;</b></h3>
    </span>
    <router-link :to="{name:'home'}">Home</router-link> |
    <!-- <router-link to="/about">About</router-link> | -->
    <router-link :to="{name: 'UserList'}" v-if="GStore.currentUser?.roleId == 2">Users</router-link> |
    <router-link :to="{name: 'Artists'}" v-if="GStore.currentUser?.roleId == 2 || 1">Artists</router-link> |
    <router-link :to="{name: 'Albums'}" v-if="GStore.currentUser?.roleId == 2 || 1">Albums</router-link> |
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