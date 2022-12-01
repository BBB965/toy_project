<template>
  <div class="comment">
    <div style="display:flex;">
      <p style="font-weight: bold; margin-right: 5px; width: 60px;">{{ comment.username }}</p>
      <p>{{ comment.content }}</p>
    </div>
    <button v-if="loginUser" v-on:click="deleteComment">DELETE</button>
  </div>
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "CommentListItem",
  data() {
    return {
      loginUser: false,
    };
  },
  props: ["comment", "communityId"],
  methods: {
    deleteComment() {
      axios({
        method: "delete",
        url: `${API_URL}/community/comments/${this.comment.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((err) => {
          alert("작성자만 지울 수 있습니다.");
          console.log(err);
        });
    },
  },
  created() {
    axios({
      method: "get",
      url: `${API_URL}/accounts/user/`,
      headers: {
        Authorization: `Token ${this.$store.state.token}`,
      },
    })
      .then((res) => {
        if (res.data.username === this.comment.username) {
          return (this.loginUser = true);
        } else {
          return (this.loginUser = false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.comment {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
}

p {
  padding-right: 5px;
}

button {
  border: 0;
  font-family: "Staatliches", cursive;
  font-size: 18px;
  background: white;
  color: crimson;
  padding: 0 20px;
  border-radius: 20px;
  margin: 0 40px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-content: center;
}

/* button:hover {
  background-color: crimson;
  color: white;
  border: 0;
  border-radius: 20px;
  height: 30px;
  width: 60px;
  display:flex;
  justify-content: center;
  align-items: center;
} */
</style>
