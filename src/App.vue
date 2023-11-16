<template>
  <nav>
    <span v-if="GStore.currentUser">
      <b>Welcome Back, {{GStore.currentUser.firstName}} {{GStore.currentUser.lastName}}.. &nbsp;</b>
    </span>
    <router-link :to="{name:'home'}">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{name: 'UserList'}" v-if="GStore.currentUser?.roleId == 2">
      Users
    </router-link> |
    <router-link v-if="!GStore.currentUser" :to="{name: 'Login'}">Login</router-link>
    <a v-else @click="logout" href="#">Log Out</a>
  </nav>
  <router-view/>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
