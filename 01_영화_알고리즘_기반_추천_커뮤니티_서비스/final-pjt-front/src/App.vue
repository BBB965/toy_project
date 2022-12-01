<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "Gowun Dodum", sans-serif;
}
/* 
nav {
  padding-bottom: 20px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
} */

.imgimg {
  width: 200px;
  height: 200px;
}

.main_title {
  font-size: 60px;
  font-family: "Staatliches", cursive;
}

/* nav a.router-link-exact-active {
  color: #050505;
} */

a {
  text-decoration: none;
}
</style>
