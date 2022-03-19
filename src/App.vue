<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <MainView />
  </div>
</template>

<script>
import MainView from './components/MainView.vue'

export default {
  name: 'App',
  components: {
    MainView
  }
}
</script>

<style>

@import '~bootstrap';
@import '~bootstrap-vue';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
