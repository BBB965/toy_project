<template>
  <div class="movie-list">
    <h2 style="background-color:crimson; color:white; padding:5px;">SSATTEN TOMATOES 최고 인기작</h2>
    <vue-glide v-model="active" :perView="5">
      <vue-glide-slide v-for="movie in movies" :key="movie.id">
        <AllMovieCard :movie="movie"/>
      </vue-glide-slide>
      <template slot="control">
        <button id="tooltip-target-3" data-glide-dir="<">
          <span class="material-symbols-outlined" style=""> arrow_back_ios </span>
          <b-tooltip target="tooltip-target-3" triggers="hover">
            버튼을 눌러서 영화를 찾아보세요!
          </b-tooltip>
        </button>
        <button id="tooltip-target-4" data-glide-dir=">">
          <span class="material-symbols-outlined"> arrow_forward_ios </span>
          <b-tooltip target="tooltip-target-4" triggers="hover">
            버튼을 눌러서 영화를 찾아보세요!
          </b-tooltip>
        </button>
      </template>
    </vue-glide>
  </div>
</template>

<script>
import AllMovieCard from './AllMovieCard.vue';
export default {
  components: {
    AllMovieCard
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies
    }
  }
}
</script>

<style scoped>
h2 {
  font-family: 'NanumSquareNeo';
}

button {
  border: 0;
  font-weight: bolder;
  background-color: white;
  border: 0;
  border-radius: 50px;
  height: 50px;
  width: 50px;
  padding: 5px;
  margin: 5px;
}

</style>