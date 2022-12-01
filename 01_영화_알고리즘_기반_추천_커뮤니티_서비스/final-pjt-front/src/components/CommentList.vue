<template>
  <div class="comment_list">
    <CommentCreate style="font-size:20px;padding: 10px 0;" v-bind:communityId="communityId" />
    <p >댓글 - {{ communityId?.comment_count }}</p>
    <ul>
      <li v-for="comment in comments" v-bind:key="comment.id">
        <CommentListItem
          v-bind:comment="comment"
          v-bind:communityId="communityId"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import CommentListItem from "./CommentListItem.vue";
import CommentCreate from "./CommentCreate.vue";

export default {
  name: "CommentList",
  components: {
    CommentListItem,
    CommentCreate,
  },
  props: ["comments", "communityId"],
};
</script>

<style scoped>
ul {
  list-style: none;
}

p {
  padding: 10px 0;
}
.comment_list {
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}
</style>
