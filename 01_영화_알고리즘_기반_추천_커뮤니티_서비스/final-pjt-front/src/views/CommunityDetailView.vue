<template>
  <div class="detail">
    <HeaderComp />
    <div class="detail_detail">
      <div class="detail_community">
        <p style="font-size: 30px; color: crimson; font-weight: bold">
          제목 : {{ community?.title }}
        </p>
        <p style="font-size: 20px; font-weight: bold">
          작성자 : {{ community?.username }}
        </p>
        <hr />
        <p style="font-size: 18px">영화 제목 : {{ community?.movietitle }}</p>
        <p style="font-size: 25px; padding: 5px 0; height: 150px">
          {{ community?.content }}
        </p>
        <p class="moviecls" v-on:click="goMovie">영화 바로가기</p>
        <p style="font-size: 12px">
          작성시간 :
          {{ $moment(community?.created_at).format("YYYY-MM-DD h:mm:ss a") }}
        </p>
        <p style="font-size: 12px">
          수정시간 :
          {{ $moment(community?.updated_at).format("YYYY-MM-DD h:mm:ss a") }}
        </p>
        <div style="display: flex">
          <button v-if="loginUser" v-on:click="putCommunity">UPDATE</button>
          <button v-if="loginUser" v-on:click="deleteCommunity">DELETE</button>
        </div>
      </div>
      <CommentList
        style="width: 50%"
        v-bind:comments="comments"
        v-bind:communityId="community"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentList from "@/components/CommentList.vue";
import HeaderComp from "@/components/HeaderComp.vue";

const API_URL = "http://127.0.0.1:8000";

export default {
  name: "CommunityDetailView",
  components: {
    CommentList,
    HeaderComp,
  },
  data() {
    return {
      community: null,
      comments: null,
      loginUser: false,
    };
  },
  created() {
    this.getCommunityDetail();
  },
  methods: {
    getCommunityDetail() {
      axios({
        method: "get",
        url: `${API_URL}/community/${this.$route.params.id}/`,
      })
        .then((res) => {
          console.log(res);
          this.community = res.data;
          this.comments = res.data.comment_set;
          this.getLoginUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getLoginUser() {
      axios({
        method: "get",
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          if (res.data.pk === this.community.user) {
            return (this.loginUser = true);
          } else {
            return (this.loginUser = false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goMovie() {
      this.$router.push({
        name: "MovieDetail",
        params: { id: this.community.movie },
      });
    },
    deleteCommunity() {
      axios({
        method: "delete",
        url: `${API_URL}/community/${this.$route.params.id}`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.push("/community");
        })
        .catch((err) => {
          console.log(err);
          alert("작성자만 삭제할 수 있습니다.");
        });
    },
    putCommunity() {
      this.$router.push({
        name: "communitycreate",
        query: {
          id: this.community.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.moviecls {
  color: black;
  font-size: 18px;
  margin: 15px 0;
}
.moviecls:hover {
  /* margin: 0px; */
  color: red;
  font-size: 21px;
  font-weight: bolder;
}

.detail_detail {
  padding: 0 100px;
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
}

.detail_community {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 50%;
}

button {
  border: 0;
  font-family: "Staatliches", cursive;
  font-size: 18px;
  background: white;
  color: crimson;

  height: 30px;
}

/* button:hover {
  background-color: crimson;
  color: white;
  border: 0;
  border-radius: 20px;
  height: 30px;
  width: 60px;
} */
</style>
