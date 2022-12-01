<template>
  <div class="login">
    <div class="input_data">
      <label for="username">ID : </label>
      <input type="text" v-model="username"/>
    </div>
    <div class="input_data">
      <label for="password">PASSWORD : </label>
      <input type="password" v-model="password"/>
    </div>
    <input class="button" type="submit" value="LOG-IN" @click="logIn">
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
    }
  },
  name: "LogInView",
  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username: username,
        password: password,
      }
      this.$store.dispatch('logIn', payload)
    }
  }
};
</script>

<style scoped>
.login {
  padding: 10px;
}
.input_data{
  margin: 10px;
}

.button{
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
