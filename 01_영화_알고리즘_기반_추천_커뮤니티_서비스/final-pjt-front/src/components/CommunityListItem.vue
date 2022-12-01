<template>
  <div class="community_list">
    <div class="card" style="width: 500px;">
      <img v-bind:src="imgURL" class="card-img-top" alt="..." />
      <div class="card-body">
        <p>{{ community.movietitle }} - {{ community.username }}</p>
        <h4 class="card-title">{{ community.title }}</h4>
        <p class="card-text">
          {{ community.content }}
        </p>
        <router-link :to="{name:'communitydetail', params: {id:community.id}}">DETAIL</router-link>
      </div>
    </div>
  </div>
</template>

<script>
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default {
  name: "CommunityListItem",
  props: ["community"],
  data() {
    return {
      imgURL : IMG_URL+this.community.movieposter,
    }
  },
};
</script>

<style scoped>
.community_list {
  padding: 5px 0;
  display: flex;
  text-align: left;
  margin: 0 10px;
  margin-bottom: 10px;
}

.card {
  border-radius: 100px;
}

img {
  border-radius: 100px 100px 0 0;
}

.community_user {
  color: darkslategray;
}

.card-body{
  margin-bottom: 70px;
}

.card-title {
  font-weight: bolder;
}

.community_title {
  font-size: 30px;
  color: black;
  width: 700px;
}
a {
  text-decoration: none;
}

.card-text {
  /* overflow: hidden;
  line-height: 1.7;
   max-height: 3.4em;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  /* -webkit-box-orient: vertical; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.8;
  overflow: hidden;
}
.card-title{
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 1.8;
  overflow: hidden;
}
</style>
