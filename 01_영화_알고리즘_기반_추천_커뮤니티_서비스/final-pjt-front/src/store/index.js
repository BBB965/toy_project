import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import router from "@/router";

Vue.use(Vuex);

const API_URL = "http://127.0.0.1:8000";
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    movies: [],
    playing: [],
    community: [],
    wishlist:[],
    token: null,
  },
  getters: {},
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies;
    },
    GET_PLAYING(state, playing) {
      state.playing = playing;
    },
    GET_COMMUNITY(state, community) {
      state.community = community;
    },
    GET_WISHLIST(state, wishlist){
      state.wishlist = wishlist
    },
    PUT_COMMUNITY(state, community){
      state.community = community
    },
    SAVE_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    getMovies(context) {
      axios({
        method: "get",
        url: `${API_URL}/movies/`,
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((res) => {
          context.commit("GET_MOVIES", res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("에러 발생?");
        });
    },
    getPlaying(context) {
      axios({
        method: "get",
        url: `${API_URL}/movies/playing/`,
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((res) => {
          context.commit("GET_PLAYING", res.data);
        })
        .catch((err) => {
          console.log(err);
          alert("왜 에러 발생?");
        });
    },
    getWishlist(context){
      axios({
        method:'get',
        url: `${API_URL}/movies/recommend/`,
        headers:{
          Authorization: `Token ${context.state.token}`
        }
      })
        .then(res=>{
          context.commit("GET_WISHLIST", res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    postWish(context, movieid){
      axios({
        method:'post',
        url: `${API_URL}/movies/recommend/`,
        data:{
          movie_id:movieid.id
        },
        headers:{
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res)=>{
          context.commit("GET_WISHLIST", res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    deleteWish(context, movieid){
      axios({
        method:'delete',
        url: `${API_URL}/movies/recommend/`,
        data:{
          movie_id:movieid.id
        },
        headers:{
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res)=>{
          context.commit("GET_WISHLIST", res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    getCommunity(context) {
      axios({
        method: "get",
        url: `${API_URL}/community/`,
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((res) => {
          context.commit("GET_COMMUNITY", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    putCommunity(context, payload){
      axios({
        method:'put',
        url:`${API_URL}/community/${payload.pageid}/`,
        data:{
          title: payload.title,
          content:payload.content,
          movie: payload.movie
        },
        headers: {
          Authorization: `Token ${context.state.token}`,
        },
      })
        .then((res)=>{
          context.commit("PUT_COMMUNITY", res.data);
          router.push({ name:'communitydetail', params:{ id:payload.pageid } })
        }) 
        .catch(err=>{
          console.log(err)
        })
    },
    signUp(context, payload) {
      axios({
        method: "post",
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        },
      })
        .then((res) => {
          context.commit("SAVE_TOKEN", res.data.key);
          router.push({ name: "cover" });
        })
        .catch(err=>{
          console.log(err)
        })
    },
    logIn(context, payload) {
      axios({
        method: "post",
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        },
      })
        .then((res) => {
          context.commit("SAVE_TOKEN", res.data.key);
          router.push({ name: "movies" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logOut(context) {
      axios({
        method: "post",
        url: `${API_URL}/accounts/logout/`,
      })
        .then((res) => {
          context.commit("SAVE_TOKEN", res.data.key);
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
