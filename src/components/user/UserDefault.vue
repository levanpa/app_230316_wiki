<script setup lang="ts">
import CommonList from '../CommonList.vue'
let listReviewData = {
  name: 'You',
  text: 'recently reviews about',
  job: 'Designer',
  hasContent: true
}
let listVoteData = {
  name: 'You',
  text: 'recently vote this review in',
  job: 'Designer',
  hasContent: true
}
</script>

<template lang="pug">
.user-default-component
  .user-list-frame
    router-link.title(to="/user/reviews" title="View all")
      h3 Recently reviews
      i.fa-solid.fa-angles-right
    CommonList(:data="listReviewData" :options="{ hasContent: true }")
  .user-list-frame
    router-link.title(to="/user/votes" title="View all")
      h3 Recently votes
      i.fa-solid.fa-angles-right
    CommonList(:data="listVoteData" :options="{ hasContent: true }")
</template>

<style lang="sass">
</style>