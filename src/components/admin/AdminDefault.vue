<script setup lang="ts">
import CommonList from '../CommonList.vue'
let listRequestData = {
  name: 'Nguyen Thi Bich Chi',
  text: 'requested a review about',
  job: 'Designer',
}
let listReportData = {
  name: 'Tran Nguyen Thanh Tu',
  text: 'reported about this review in',
  job: 'Designer',
}
</script>

<template lang="pug">
.admin-default-component
  .user-list-frame
    router-link.title(to="/admin/requests" title="View all")
      h3 New job requests
      i.fa-solid.fa-angles-right
    CommonList(:data="listRequestData" :options="{ hasContent: false }")
  .user-list-frame
    router-link.title(to="/admin/reports" title="View all")
      h3 New reports
      i.fa-solid.fa-angles-right
    CommonList(:data="listReportData" :options="{ hasContent: true }")
</template>

<style lang="sass">
</style>