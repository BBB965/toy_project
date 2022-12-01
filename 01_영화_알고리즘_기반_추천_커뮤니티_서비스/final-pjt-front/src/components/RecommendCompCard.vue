<template>
  <div class="recommend_movie">
    <img :src="movieImgURL" alt="recommend_movieImg" height="300" />
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: ['title', 'posterPath'],
  computed: {
    movieImgURL() {
      return `http://themoviedb.org/t/p/w600_and_h900_bestv2${this.posterPath}`;
    }
  }
}
</script>

<style scoped>
.recommend_movie {
  font-size: 30px;
  font-weight: bold;
  font-family: 'NanumSquareNeo';
}
</style>