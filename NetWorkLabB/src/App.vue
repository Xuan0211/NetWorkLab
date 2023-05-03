<template>
  <div id="app">
    <mainPage></mainPage>
  </div>
</template>

<script>
import mainPage from "./components/mainPage.vue";
export default {
  name: 'App',
  components:
  {
    mainPage
  }
}
</script>

<style>
#app {
  position: fixed;
  width: 100%;
  height: 100%;
  margin:0;
  padding:0;
} 
</style>
