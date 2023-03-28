<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import axios from 'axios'
import * as dto from '../dto'
import { useJobsStore } from '../stores/jobs'

let jobStore = useJobsStore()
let jobs: Ref<dto.jobDto[]> = ref([])
let tempJob: dto.jobDto[] | undefined

fetchData()

function fetchData() {
  tempJob = jobStore.get()
  if (tempJob && tempJob[0]) {
    jobs.value = tempJob
  }
  axios.get('http://localhost:3003/jobs').then((response) => {
    jobs.value = response.data
    jobs.value && jobStore.add(jobs.value)
  })
}
</script>

<template lang="pug">
.main-content-component
  ul.job-list(v-if="jobs[0]")
    li.job-item(v-for="item in jobs")
      router-link.job-link(:to="'/detail/' + item.id")
        img.job-image(:src="item.img", :alt="item.name")
        .job-info
          .job-name.has-icon
            i.fa-solid.fa-briefcase
            span.name {{ item.name }}
            span.count &nbsp;({{ item.review_counter }})
          .job-location.has-icon
            i.fa-solid.fa-location-dot
            span {{ item.location }}
          .job-field.has-icon
            i.fa-regular.fa-map
            span {{ item.category }}

</template>

<style lang="sass">
@import "/src/sass/main-content"
</style>
