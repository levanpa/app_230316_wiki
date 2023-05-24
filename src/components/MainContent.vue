<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import * as axios from '@/axios'
import * as dto from '@/dto'

let jobs: Ref<dto.jobDto[]> = ref([])

onMounted(async () => {
  await axios.fetchAll('jobs', { _limit: 5 }).then((response) => {
    jobs.value = response as dto.jobDto[]
  })
})

function changeTab(event: Event) {
  event.preventDefault()
  document.querySelector('.tab-list .tab.active')?.classList.remove('active');
  (event.target as HTMLButtonElement).classList.add('active')
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
      router-link.job-link(:to="'/detail/' + item.id")
        img.job-image(:src="item.img", :alt="item.name")
        .job-info
          .job-name.has-icon
            i.fa-solid.fa-briefcase
            span.name {{ item.name }}
          .job-location.has-icon
            i.fa-solid.fa-location-dot
            span {{ item.review_counter }} reviews
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
