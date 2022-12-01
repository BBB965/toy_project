<template>
  <div >
    <label for="comment">댓글: </label>
    <input style="border-right:0; border-left:0; border-top:0;" type="text" required pattern=".*\S.*" v-on:keyup.enter="submitComment" v-model="commentInput">
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
    name:"CommentCreate",
    props:[
        "communityId",
    ],
    data(){
        return{
            commentInput:"",
        }
    },
    methods:{
        submitComment(){
            if (!this.commentInput){
                alert('댓글을 입력해주세요.')
            }
            axios({
                method:'post',
                url:`${API_URL}/community/${this.communityId.id}/comments/`,
                data:{
                    content: this.commentInput,
                },
                headers:{
                    Authorization: `Token ${this.$store.state.token}`
                }
            })
            .then((res)=>{
                console.log(res)
                this.$router.go()
                this.commentInput = ""
            })
            .catch(err=>{
                console.log(err)
            })
        },
    }
}
</script>
                                 
<style scoped>
input{
    border-width: 2px;
    border-style: solid;
    border-color: #333; 
    padding: 10px;
}
input:not(:placeholder-shown){
    border-color: #a00;
}
input:valid{
    border-color: #0a0;
}
</style>