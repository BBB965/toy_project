<template>
  <div class="cover_view">
    <img alt="Site logo" src="../assets/ssatten_by_kty.jpg" class="imgimg"/>
    <p class="main_title">SSATTEN TOMATOES</p>
    <LogInView />
    <router-link to="/signup">아직 회원가입을 안하셨나요?</router-link>
  </div>
</template>

<script>
import LogInView from './LogInView';
export default {
  components: {
    LogInView
  }
}
</script>

<style scoped>
.cover_view {
  padding: 20px 0;
  margin: auto;
  margin-top: 20px;
  border: 5px solid crimson;
  border-radius: 20px;
  background-color: white;
  width: 50%;
}
</style>