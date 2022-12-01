<template>
  <div>
    <h2 style="background-color: crimson; color: white; padding: 5px">
      현재 상영중인 영화
    </h2>
    <vue-glide v-model="active" :perView="5">
      <vue-glide-slide v-for="movie in movies" :key="movie.id">
        <NowPlayCard :movie="movie" />
      </vue-glide-slide>
      <template slot="control">
        <button id="tooltip-target-1" data-glide-dir="<">
          <span class="material-symbols-outlined" style=""> arrow_back_ios </span>
          <b-tooltip target="tooltip-target-1" triggers="hover">
            버튼을 눌러서 영화를 찾아보세요!
          </b-tooltip>
        </button>
        <button id="tooltip-target-2" data-glide-dir=">">
          <span class="material-symbols-outlined"> arrow_forward_ios </span>
          <b-tooltip target="tooltip-target-2" triggers="hover">
            버튼을 눌러서 영화를 찾아보세요!
          </b-tooltip>
        </button>
      </template>
    </vue-glide>
  </div>
</template>

<script>
// import axios from 'axios'
import NowPlayCard from "./NowPlayCard.vue";

export default {
  components: {
    NowPlayCard,
  },
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    movies() {
      return this.$store.state.playing;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
}

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
  padding: 10px;
  margin: 10px;
}
</style>
