<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100vh;
    padding: 50px;
    background: rgb(230, 242, 253);
    font-family: 'Roboto', sans-serif;
    color: #383838;
  }
</style>
