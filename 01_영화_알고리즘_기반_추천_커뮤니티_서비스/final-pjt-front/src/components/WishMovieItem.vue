<template>
  <div v-if="flag">
    <p @click="removeWish">{{ movie.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'WishMovieItem',
  props:[
    'movie',
  ],
  data() {
    return {
      flag: true,
    }
  },
  methods: {
    wishFlag(){
      this.$store.dispatch('getWishlist')
      const wishmovie = this.$store.state.wishlist
      for (let wish of wishmovie){
        if (wish.id === this.movie.id){
          this.flag = false
        } 
      }
    },
    removeWish(){
      const movieid = this.movie
      this.$store.dispatch('deleteWish', movieid)
      this.wishFlag()
      this.$router.go()
    },
  }
}
</script>

<style scoped>
p {
  font-size: 28px;
  font-family: 'NanumSquareNeo';
}
</style>