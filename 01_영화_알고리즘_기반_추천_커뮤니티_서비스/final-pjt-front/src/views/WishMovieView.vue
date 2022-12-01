<template>
  <div>
    <HeaderComp />
    <h1>{{ user }}'s WishList</h1>
    <hr>
    <WishMovie v-bind:userid="userid"/>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderComp from '@/components/HeaderComp.vue';
import WishMovie from '@/components/WishMovie.vue';

const API_URL = 'http://127.0.0.1:8000'

export default {
  name:'WishMovieView',
  data(){
    return{
      user:null,
      userid:null,
    }
  },
  components:{
    HeaderComp,
    WishMovie
  },
  created(){
    axios({
      method:'get',
      url:`${API_URL}/accounts/user/`,
      headers:{
        Authorization: `Token ${this.$store.state.token}`
      }
    })
      .then(res=>{
        this.user = res.data.username
        this.userid = res.data.pk
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
  },

}
</script>

<style scoped>

h1 {
  padding-top: 50px;
  padding-bottom: 10px;
  font-family: 'NanumSquareNeo';
}

</style>