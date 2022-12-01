<template>
  <div>
    <div v-if="movies[0] === '영화추가'">
      <h1>영화를 추가해주세요</h1>
      <router-link to="/movies">
        <button>ADD LIKE-MOVIE</button>
      </router-link>
    </div>
    <ul>
      <li v-for="movie in movies" v-bind:key="movie.id">
        <WishMovieItem v-bind:movie="movie" />
      </li>
    </ul>
    <div v-if="movies[0] !== '영화추가'">
      <button @click="test">RECOMMEND</button>
    </div>
    <ul style="display: flex; justify-content: space-around; padding-top: 50px">
      <li v-for="movie in recommend_movies" :key="movie.id">
        <RecommendCompCard
          :title="movie.title"
          :posterPath="movie.poster_path"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import WishMovieItem from "@/components/WishMovieItem.vue";
import RecommendCompCard from "./RecommendCompCard.vue";

export default {
  name: "WishMovie",
  data() {
    return {
      movies: this.$store.state.wishlist,
      recommend_movies: [],
      retemp_arr: [],
    };
  },
  props: ["userid"],
  components: {
    WishMovieItem,
    RecommendCompCard,
  },
  created() {
    this.$store.dispatch("getWishlist");
  },
  methods: {
    async test() {
      // const API_KEY = process.env.VUE_APP_API_KEY;
      const API_KEY = "d33243f64c969db5c7294c3f2f559529";
      // const API_URL = process.env.VUE_APP_API_URL;
      const API_URL = "https://api.themoviedb.org/3/movie";
      try {
        const temp_movies = [];
        let min_vote = 1e9;
        let all_avg = 0;
        for (let i = 0; i < this.movies.length; i++) {
          const API_URL_C = `${API_URL}/${this.movies[i].movie_num}/similar`;
          const response = await axios.get(API_URL_C, {
            params: {
              api_key: API_KEY,
              language: "ko-KR",
            },
          });
          const temp_arr = response.data.results;
          for (let j = 0; j < temp_arr.length; j++) {
            temp_movies.push(temp_arr[j]);
            if (min_vote > temp_arr[j].vote_count) {
              min_vote = temp_arr[j].vote_count;
            }
            all_avg = all_avg + temp_arr[j].vote_average;
          }
        }
        all_avg = all_avg / (this.movies.length * 20);
        this.recommend_movies = temp_movies.reduce((acc, current) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        this.recommend_movies = this.recommend_movies.sort(function (a, b) {
          var comp_a =
            a.popularity * 0.1 +
            (a.vote_count / (a.vote_count + min_vote)) * a.vote_average +
            (min_vote / (min_vote + a.vote_count)) * all_avg;
          var comp_b =
            b.popularity * 0.1 +
            (b.vote_count / (b.vote_count + min_vote)) * b.vote_average +
            (min_vote / (min_vote + b.vote_count)) * all_avg;
          if (comp_a > comp_b) {
            return -1;
          } else if (comp_a < comp_b) {
            return 1;
          }
          return 0;
        });
        this.recommend_movies = this.recommend_movies.slice(0, 3);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding-top: 10px;
}

h1 {
  margin-top: 50px;
  font-family: "NanumSquareNeo";
}

button {
  border: 0;
  font-family: "Staatliches", cursive;
  font-size: 45px;
  background-color: crimson;
  color: white;
  border: 0;
  border-radius: 20px;
  height: 70px;
  width: 400px;
  font-family: "Staatliches", cursive;
  margin: 50px;
}
</style>
