<template>
  <div>
    <HeaderComp />
    <div class="back_image" :style="{ backgroundImage : `url(${imgBackUrl})`}">
      <div class="movie_detail" >
        <img v-bind:src="imgURL" alt="movieImg" height="300"/>
        <div class="movie_data">
          <p style="font-size:25px;">{{ movie?.title }}</p>
          <div>
            <div v-if="flag">
              <b-button class='wishbtn' v-on:click="makeWish">보고싶어요</b-button>
            </div>
            <div v-else>
              <b-button class="unwishbtn" v-on:click="removeWish">보고싶어요 취소</b-button>
            </div>
          </div>
          <p>개봉 일자 : {{ movie?.release_date }}</p>
          <p>{{ movie?.overview }}</p>
          <p>평점 : {{ movie?.vote_average }}</p>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import HeaderComp from '../components/HeaderComp.vue'

const API_URL = "http://127.0.0.1:8000";
const IMG_URL = "https://themoviedb.org/t/p/w600_and_h900_bestv2";
const back_URL = 'https://image.tmdb.org/t/p/w500';

export default {
  name: "MovieDetail",
  components:{
    HeaderComp,
  },
  data() {
    return {
      movie: null,
      imgURL: null,
      imgBackUrl:null,
      flag: true,
    };
  },
  created() {
    this.getMovieDetail();
    // this.wishFlag()
  },
  methods: {
    getMovieDetail() {
      axios({
        method: "get",
        url: `${API_URL}/movies/${this.$route.params.id}`,
      })
      .then((res) => {
        this.movie = res.data;
        this.imgURL = IMG_URL + this.movie.poster_path;
        this.imgBackUrl = back_URL + this.movie.backdrop_path;
        this.wishFlag();
      })
      .catch((err) => {
        console.log(err);
        alert("왜 에러 발생?");
      });
    },
    wishFlag(){
      this.$store.dispatch('getWishlist')
      const wishmovie = this.$store.state.wishlist
      for (let wish of wishmovie){
        if (wish.id === this.movie.id){
          this.flag = false
        } 
      }
    },
    makeWish(){
      const movieid = this.movie
      this.$store.dispatch('postWish', movieid)
      this.wishFlag()
      this.$router.go()
    },
    removeWish(){
      const movieid = this.movie
      this.$store.dispatch('deleteWish', movieid)
      this.wishFlag()
      this.$router.go()
    },
  },
};
</script>

<style>
.back_image {
  background-size: 100% 100%;
  height: 550px;
  display: flex;
}

.movie_detail {
  display: flex;
  justify-content: center;
  align-items: center;
  background:rgba(0, 0, 0, 0.6);
  color: white;
}

.movie_data{
  width: 35%;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  font-weight: bold;
}
</style>
