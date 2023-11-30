<template>
    <div class="container-fluid bg-dark" id="top">
    <nav class="navbar navbar-expand-xl navbar-dark bg-dark text-light container-fluid">
      <div class="container-lg">
        <i class="bi bi-music-note-beamed" style="font-size: 2.4rem;"></i>
        <h3>Rap Wrapped</h3>
        <span v-if="GStore.currentUser">
          <h4 class="greetH3">Welcome Back, {{GStore.currentUser.firstName}} {{GStore.currentUser.lastName}}.. &nbsp;</h4>
        </span>

        <!-- toggle button for mobile nav -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- navbar links -->
        <div class="collapse navbar-collapse justify-content-start align-center bg-dark text-light" id="main-nav" >
          <ul class="navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" data-bs-toggle="collapse" :to="{name:'home'}">
                  <span data-bs-toggle="collapse" data-bs-target="#main-nav">
                    Home
                  </span>
                </router-link> 
            </li>

              <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'UserList'}" v-if="GStore.currentUser?.roleId == 2">
                  <span data-bs-toggle="collapse" data-bs-target="#main-nav">Users</span>
                </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'Artists'}" v-if="GStore.currentUser">
                <span data-bs-toggle="collapse" data-bs-target="#main-nav">Artists</span>
              </router-link>
              
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'Albums'}" v-if="GStore.currentUser">
                Albums
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" v-if="!GStore.currentUser" :to="{name: 'Login'}">
                Login
              </router-link>
              <a  class="nav-link" v-else @click="logout" href="#">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>

  
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