<script setup lang="ts">
import CommonList from '../CommonList.vue'
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
    .title
      h3 Recently votes
      i.fa-solid.fa-angles-right
    CommonList(:data="listVoteData" :options="{ hasContent: true, limit: 8 }")
</template>

<style lang="sass">
</style>