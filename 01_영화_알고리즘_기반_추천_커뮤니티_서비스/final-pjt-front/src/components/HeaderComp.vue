<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/movies" class="navbar-brand">
        <img alt="Vue logo" src="../assets/tomato.png" style="height: 60px" />
        <span style="font-size: 25px; padding: 0 10px">HELLO, {{ user }}</span>
        <span
          class="material-symbols-rounded"
          @click="LogOut"
          style="font-size: 20px"
        >
          logout
        </span>
      </router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/wishlist" class="nav-link">
            <span class="material-symbols-rounded"> favorite </span>
            wishlist
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/movies" class="nav-link">
            <span class="material-symbols-rounded"> movie </span>
            movie
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'community' }" class="nav-link"
            ><span class="material-symbols-rounded">
              comment
            </span>
            commumity
            </router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'communitycreate' }" class="nav-link">
            <span class="material-symbols-rounded"> edit </span>
            write
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "HeaderComp",
  data() {
    return {
      user: null,
    };
  },
  created() {
    axios({
      method: "get",
      url: `${API_URL}/accounts/user/`,
      data: {},
      headers: {
        Authorization: `Token ${this.$store.state.token}`,
      },
    })
      .then((res) => {
        this.user = res.data.username;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    LogOut() {
      this.$store.dispatch("logOut");
    },
  },
};
</script>

<style scoped>
nav .navbar-nav a.router-link-exact-active {
  color: #42b983 !important;
}
.nav-item {
  height: 60px;
  width: 150px;
  font-size: 25px;
}

li {
  padding-right: 10px;
}
.navbar-nav {
  font-size: 30px;
  font-weight: bold;
  color: #000000;
  display: flex;
  justify-content: center;
  align-content: center;
}
.nav-link {
  display: flex;
  justify-content: center;
  align-content: center;
}
span {
  font-size: 30px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
