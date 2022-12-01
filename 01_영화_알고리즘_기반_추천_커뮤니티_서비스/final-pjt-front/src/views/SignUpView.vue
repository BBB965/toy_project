<template>
  <div class="signup">
    <h1>회원가입 페이지</h1>
    <label for="username">ID : </label>
    <input type="text" v-model="username" /> <br />
    <label for="password1">PASSWORD : </label>
    <input type="password" v-model="password1" /> <br />

    <label for="password2">PASSWORD CONFIRMATION : </label>
    <input type="password" v-model="password2" />
    <div>
      <button @click="signUp">SUBMIT</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    };
  },
  methods: {
    signUp() {
      const username = this.username;
      const password1 = this.password1;
      const password2 = this.password2;

      const payload = {
        username: username,
        password1: password1,
        password2: password2,
      };
      this.$store.dispatch("signUp", payload);
    },
  },
};
</script>

<style scoped>
.signup {
  margin: 100px;
  border: 5px solid crimson;
  padding: 30px;
  border-radius: 20px;
}

h1 {
  font-family: "NanumSquareNeo";
}

label,
input {
  margin: 10px 0;
}

button {
  background-color: crimson;
  color: white;
  border: 0;
  border-radius: 20px;
  height: 30px;
  width: 90px;
  font-family: 'Staatliches', cursive;
  font-size: 20px;
  margin: 15px;
}
</style>
