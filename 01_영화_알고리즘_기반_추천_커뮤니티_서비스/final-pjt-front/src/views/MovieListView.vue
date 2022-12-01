<template>
  <div>
    <HeaderComp />
    <NowPlaying />
    <AllMovie />
  </div>
</template>

<script>
import AllMovie from "@/components/AllMovie.vue";
import NowPlaying from "@/components/NowPlaying.vue";
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  components: {
    AllMovie,
    NowPlaying,
    HeaderComp,
  },
  data() {
    return {
      user: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.token ? true : false;
    },
  },
  created() {
    this.getMovies(), this.getPlaying();
  },
  methods: {
    getMovies() {
      if (this.isLogin === true) {
        this.$store.dispatch("getMovies");
      } else {
        alert("로그인이 필요한 서비스입니다!");
        this.$router.push({ name: "cover" });
      }
    },
    getPlaying() {
      this.$store.dispatch("getPlaying");
    },
    goCommunity() {
      this.$router.push({ name: "community" });
    },
  },
};
</script>

<style scoped>
button {
  margin: 20px;
  border: 0;
  border-radius: 50px;
  color: crimson;
  font-size: 28px;
  padding: 10px;
  background-color: rgb(230, 210, 196);
  height: 45px;
  font-family: "Gowun Dodum", sans-serif;
  display: flex;
  align-items: center;
}
button:hover {
  margin: 20px;
  padding: 5px;
  border: 5px solid crimson;
}
</style>
