<template>
  <div class="create_review">
    <HeaderComp /> 
    <label for="title">제목: </label>
    <input type="text" id="title" v-model.trim="title"><br>
    <label for="movie">영화:</label>
    <select v-model="selected">
      <option value="">-----</option>
      <option v-for="movie in movies" v-bind:key="movie.id" v-bind:value="movie.id">{{ movie.title }}</option>
    </select>
    <label for="content">내용: </label>
    <textarea id="content" cols="30" rows="10" v-model="content"></textarea><br>
    <button type="submit" v-on:click="submitForm" v-if="!id">SUBMIT</button>
    <button type="submit" v-on:click="putForm" v-if="id">UPDATE</button>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComp from '../components/HeaderComp.vue'
import _ from 'lodash';

const API_URL = 'http://127.0.0.1:8000'

export default {
  name:'CommunityCreateView',
  components:{
    HeaderComp, 
  },
  data(){
    return{
      id:this.$route.query.id,
      title: null,
      content: null, 
      movies:null,
      selected:null,
    }
  },
  created(){
    this.movies = this.$store.state.movies
    this.movies = _.sortBy(this.movies, 'title')
    console.log(this.movies)
    if (this.id){
      for (let commuid of this.$store.state.community){
        if (commuid.id === this.id){
          this.title = commuid.title
          this.content = commuid.content
          this.selected = commuid.movie
        }
      }
    }
  },
  methods:{
    submitForm(){
      const title = this.title
      const content = this.content
      const movie = Number(this.selected)
      // const regex = /[^0-9]/g
      // const regex = /^(\d)+
      // const result = this.selected.replace(regex,"")
      // const movie = Number(result)
      if (!title){
        alert('제목을 입력해주세요.')
        return
      } else if (!content){
        alert('내용을 입력해주세요.')
        return
      } else if (!movie){
        alert('영화를 선택해주세요.')
      }
      axios({
        method:'post',
        url: `${API_URL}/community/`,
        data:{
          title:title,
          content:content,
          movie:movie
        },
        headers:{
          Authorization: `Token ${this.$store.state.token}`
        }
      })
      .then((res) => {
        console.log(res)
        this.$router.push({ name:'community'})
      })
      .catch((err) => {
        console.log(err)
      })
    },
    putForm(){
      const puttitle = this.title
      const putcontent = this.content
      const putmovie = this.selected
      const putid = this.id

      const payload = {
        title:puttitle,
        content:putcontent,
        movie:putmovie,
        pageid:putid,
      }

      this.$store.dispatch('putCommunity', payload)
    }
  }
}
</script>

<style scoped>
.create_review {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  font-family: 'NanumSquareNeo';
}

label {
  font-size: 20px;
}

input, select, textarea {
  width: 500px;
}

button {
  background-color: crimson;
  color: white;
  border: 0;
  border-radius: 20px;
  height: 30px;
  width: 90px;
  font-family: 'Staatliches', cursive;
  font-size: 22px;
  margin: 15px;
}

button:hover {
  background-color: white;
  color: crimson;
  border-radius: 20px;
  border: 0;
  height: 35px;
  width:95px;
  margin:15px;
}

</style>