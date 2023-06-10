<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
// import { fetchData } from '@/axios'
import * as dto from '@/dto'
import CommonList from '../CommonList.vue'

let listReviewData: Ref<dto.commonListInterface[]> = ref([])
let listVoteData: Ref<dto.commonListInterface[]> = ref([])

// todo: fix fetch data
onMounted(async () => {
  // await fetchData('job', `http://localhost:3000/review?user_id=userId`, { id: 0 }).then((response) => {
  //   (response as dto.jobDto[]).forEach((item: dto.jobDto) => {
  //     listReviewData.value.push({
  //       name: 'Nguyen Thi Bich Chi',
  //       text: 'recently reviews about',
  //       job: item.name,
  //       url: `http://localhost:5173/detail/${item.id}`,
  //       created: item.created || 0,
  //     })
  //   })
  // })
  // await fetchData('report', `http://localhost:3000/reports/`, 0).then((response) => {
  //   (response as dto.reportDto[]).forEach((item) => {
  //     listReportData.value.push({
  //       name: 'Tran Nguyen Thanh Tu',
  //       text: 'reported about this review in',
  //       job: 'Designer',
  //       content: item.content,
  //       url: `http://localhost:5173/detail/${item.job_id}`,
  //       created: item.created || 0,
  //     })
  //   })
  // })
})
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