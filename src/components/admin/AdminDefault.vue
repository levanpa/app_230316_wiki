<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import * as axios from '@/axios'
import * as dto from '@/dto'
import CommonList from '../CommonList.vue'

let listRequestData: Ref<dto.commonListInterface[]> = ref([])
let listReportData: Ref<dto.commonListInterface[]> = ref([])

onMounted(() => {
  fetchRequest()
  fetchReport()

  function fetchRequest() {
    axios.fetchAll('jobs', { is_public: false, _limit: 3 }).then(async (response) => {
      const data = response as dto.jobDto[]
      const promises = data.map(item => {
        listRequestData.value.push({
          name: '',
          text: 'requested a review about',
          job: item.name,
          url: `detail/${item.id}`,
          created: item.created || 0,
        })
        return axios.fetchOne('users', item.user_id || 0)
      })

      // get user name
      await Promise.all(promises).then((response) => {
        (response as dto.userDto[]).map((item, index: number) => {
          listRequestData.value[index].name = item.name
        })
      })
    })
  }
  function fetchReport() {
    axios.fetchAll('reports', { _limit: 3 }).then(async (response) => {
      const data = response as dto.reportDto[]
      const promises1 = data.map(item => {
        listReportData.value.push({
          name: '',
          text: 'reported about this review in',
          job: '',
          content: item.content,
          url: `detail/${item.job_id}`,
          created: item.created || 0,
        })
        return axios.fetchOne('users', item.user_id)
      })
      const promises2 = data.map(item => {
        return axios.fetchOne('jobs', item.job_id)
      })

      // get user name
      await Promise.all(promises1).then((response) => {
        (response as dto.userDto[]).map((item, index: number) => {
          listReportData.value[index].name = item.name
        })
      })

      // get job name
      await Promise.all(promises2).then((response) => {
        (response as dto.jobDto[]).map((item, index: number) => {
          listReportData.value[index].job = item.name
        })
      })
    })
  }
})
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