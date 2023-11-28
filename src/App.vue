<template>
  <nav-bar></nav-bar>
  <div class="container-lg pt-3">
    <router-view/>
  </div>

  <div class="container-fluid bg-dark fixed-bottom text-white">
    <div class="container-lg pt3">
      <footer class="text-start"> &#169; Richard Gomez 2023</footer>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: { NavBar },
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
