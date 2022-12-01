<template>
  <div class="community">
    <div
      class="community-card"
      v-for="community in communities"
      v-bind:key="community.id"
    >
      <CommunityListItem v-bind:community="community" />
    </div>
  </div>
</template>

<script>
import CommunityListItem from "./CommunityListItem.vue";

export default {
  name: "CommunityList",
  props: ["communities"],
  components: {
    CommunityListItem,
  },
};
</script>

<style scoped>
.community {
  display: grid;
  margin: 10px;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
}

.community-card {
  border: 0px;
  margin: 100px;
  width: 300px;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
}
</style>
