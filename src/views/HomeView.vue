<template>
  <div class="home">
    <img class="rotate-horizontal" alt="Trap logo" src="../assets/trap.png" width="400" height="150">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>TRENDING TRAP MUSIC</h1>
    <h3>Keep up with all your favorite Trap artists here</h3>
    <img src="../assets/rap.png" alt="rap concert" width="700">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
  .rotate-horizontal {
    animation: rotateHorizontal 2s linear infinite; /* Adjust the duration and timing function as needed */
  }

  @keyframes rotateHorizontal {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }

  .home h1{
    font-weight: bold;
    color: black;
    
  } 

  .home h3{
    color: black;
  }
  
</style>
