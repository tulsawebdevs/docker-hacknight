<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

let msg = ref('');

async function sayHi() {
  try{
    let response = await axios.get('api/sayhi');
    msg.value = response.data;
    setTimeout(() => msg.value = '', 2000)
  }catch (e){
    console.log(e);
    msg.value = 'error fetching message';
  }
}
</script>

<template>
  <div class="container">
    <nav>
      <router-link to="/requests">Request Log</router-link>
    </nav>
    <button @click="sayHi">Say Hi</button>
    <div class="message-window">
      {{ msg }}
    </div>
  </div>
</template>

<style scoped>
.container{
  padding:1rem;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh; 
}

button {
  padding: 1rem 2rem;
  margin: 0 auto;
  width: 300px;
}
.message-window{
  width: 300px;
  min-height: 64px;
  margin: 2rem auto;
  padding: 1rem 2rem;
  border: 2px solid gray;
  box-shadow: 0 0 2px 4px lightgray inset;
  border-radius:.5rem;
  text-align: center;
}

nav {
  margin-bottom: 2rem;
}
</style>
