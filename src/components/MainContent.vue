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
  axios.get('http://localhost:3030/users').then((response) => {
    console.log('response.data', response.data)
    // jobs.value = response.data
    // jobs.value && jobStore.add(jobs.value)
  })
}

function changeTab(event: Event) {
  event.preventDefault()
  // todo: logic change tab
}

function paginate(event: Event) {
  event.preventDefault()
  // todo: logic change page
}
</script>

<template lang="pug">
.main-content-component
  .filter-wrapper
    ul.tab-list
      li.tab-item
        button.tab.tab-new.active(@click="$event=>changeTab($event)") Newest reviewed
      li.tab-item
        button.tab.tab-most(@click="$event=>changeTab($event)") Most reviewed
  .pagination-wrapper
    ul.pagination-list
      each i in Array(6)
        li.pagination-item
          button.page(@click="$event=>paginate($event)") 1
  ul.job-list(v-if="jobs[0]")
    li.job-item(v-for="item in jobs")
      router-link.job-link(:to="'/detail/' + item.job_id")
        img.job-image(:src="item.img", :alt="item.name")
        .job-info
          .job-name.has-icon
            i.fa-solid.fa-briefcase
            span.name {{ item.name }}
            span.count ({{ item.review_counter }})
          .job-location.has-icon
            i.fa-solid.fa-location-dot
            span {{ item.location }}
          .job-field.has-icon
            i.fa-regular.fa-map
            span {{ item.category }}
  p(v-else) There are no jobs
  .pagination-wrapper
    ul.pagination-list
      each i in Array(6)
        li.pagination-item
          button.page(@click="$event=>paginate($event)") 1

</template>

<style lang="sass">
@import "/src/sass/main-content"
</style>
