<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './pages/home'

export default {
  name: 'App',
  components: {
    Home
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
  padding: 15px;
}
/* * {
  margin: 0;
  padding: 0
} */
</style>
