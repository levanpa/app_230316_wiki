<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import CommonList from './CommonList.vue'
import * as axios from '@/axios'
import * as dto from '@/dto'

let listRecentlyData: Ref<dto.commonListInterface[]> = ref([])

onMounted(async () => {
  await axios.fetchAll('reviews', { _page: 2, _limit: 5 }).then(async (response) => {
    const data = response as dto.reviewDto[]
    const promises1 = data.map((item) => {
      listRecentlyData.value.push({
        name: '',
        text: 'recently reviews about',
        job: '',
        content: item.content,
        url: `detail/${item.job_id}`,
        created: item.created || 0,
      })
      return axios.fetchOne('users', item.user_id || 0)
    })

    const promises2 = data.map(item => {
      return axios.fetchOne('jobs', item.job_id)
    })

    // get user name
    await Promise.all(promises1).then((response) => {
      (response as dto.userDto[]).map((item, index: number) => {
        listRecentlyData.value[index].name = item.name
      })
    })

    // get job name
    await Promise.all(promises2).then((response) => {
      (response as dto.jobDto[]).map((item, index: number) => {
        listRecentlyData.value[index].job = item.name
      })
    })
  })
})
</script>

<template lang="pug">
.sidebar-component
  p.sidebar-title Recently reviews
  p.sidebar-info Các review có thể mang tính chủ quan. Hãy xem những review này như là nhận xét, trải nghiệm, đánh giá của những người đã có kinh nghiệm.
  CommonList(:data="listRecentlyData" :options="{ hasContent: true }")
</template>

<style lang="sass">
@import "/src/sass/sidebar"
</style>

<style lang="sass" scoped>
.common-list-component
  padding: 0
</style>