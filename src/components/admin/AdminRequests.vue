<script setup lang="ts">
import CommonList from '../CommonList.vue'
let listRequestData = {
  name: 'Nguyen Thi Bich Chi',
  text: 'requested a review about',
  job: 'Designer',
  hasContent: false
}
</script>

<template lang="pug">
.admin-default-component
  .user-list-frame
    .title
      h3 New job requests
      i.fa-solid.fa-angles-right
    CommonList(:data="listRequestData" :options="{ hasContent: true, limit: 8 }")
</template>

<style lang="sass">
</style>