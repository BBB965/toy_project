<template>
  <div class="moviecard">
    <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
      <img v-bind:src="movieImgURL" alt="movieImg" height="300" />
    </router-link>
    <div>{{ movie.title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
  computed: {
    movieImgURL() {
      const poster_path =
        "https://themoviedb.org/t/p/w600_and_h900_bestv2" +
        this.movie.poster_path;
      
      
      return poster_path;
    },
  },
};
</script>

<style>
.moviecard {
  margin: 10px;
  padding: 20px 0;
  font-size: 25px;
}
.moviecard img{
  border-radius:10px ;
}
.moviecard:hover {
  margin: 5px;
  border: 5px solid crimson;
  border-radius: 25px;
  font-weight: bolder;
}
</style>