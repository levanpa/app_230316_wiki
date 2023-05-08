<script setup lang="ts">
import CommonList from '../CommonList.vue'
let listReportData = {
  name: 'Tran Nguyen Thanh Tu',
  text: 'reported about this review in',
  job: 'Designer',
}
</script>

<template lang="pug">
.admin-default-component
  .user-list-frame
    .title
      h3 New reports
      i.fa-solid.fa-angles-right
    CommonList(:data="listReportData" :options="{ hasContent: true, limit: 8 }")
</template>

<style lang="sass">
</style>