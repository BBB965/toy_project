<template>
  <div class="menu_link">
    <HeaderComp />
    <h1>꼬리의 꼬리를 무는 영화이야기</h1>
    <CommunityList v-bind:communities="communities" />
  </div>
</template>

<script>
import CommunityList from "@/components/CommunityList.vue";
import HeaderComp from "../components/HeaderComp.vue";

export default {
  name: "CommunityView",
  components: {
    CommunityList,
    HeaderComp,
  },
  computed: {
    isLogin() {
      return this.$store.state.token ? true : false;
    },
    communities() {
      return this.$store.state.community;
    },
  },
  created() {
    this.getCommunity();
  },
  methods: {
    getCommunity() {
      if (this.isLogin === true) {
        this.$store.dispatch("getCommunity");
      } else {
        alert("로그인이 필요한 서비스 입니다.");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  background-color: crimson;
  color: white;
  padding: 5px;
}
.menu_link a {
  border: 0;
  border-radius: 50px;
  color: crimson;
  font-size: 28px;
  padding: 0 8px;
  background-color: rgb(230, 210, 196);
  margin: 20px;
}
.menu_link a:hover {
  margin: 15px;
  border: 5px solid crimson;
}

a {
  text-decoration: none;
}
</style>
