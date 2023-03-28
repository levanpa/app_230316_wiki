<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as dto from './dto';

const route = useRoute()
let reviews: Ref<dto.reviewDto[]> = ref([])
let job: Ref<dto.jobDto | undefined> = ref()
let jobId: string = (route.params.id).toString()

// fetch data
axios.get('http://localhost:3003/jobs', {
  params: {
    id: jobId
  }
}).then((response) => {
  job.value = response.data[0]
})
axios.get('http://localhost:3003/reviews', {
  params: {
    job_id: jobId
  }
}).then((response) => {
  reviews.value = response.data
})
</script>

<template lang="pug">
.detail-component
  .layout-wrapper
    .job-item
      img.job-image(src="/src/assets/logo.svg", alt="")
      .job-info
        .job-name.has-icon
          i.fa-solid.fa-briefcase
          span.name {{ job?.name }}
          span.count &nbsp;({{ job?.review_counter }})
        .job-location.has-icon
          i.fa-solid.fa-location-dot
          span {{ job?.location }}
        .job-field.has-icon
          i.fa-regular.fa-map
          span {{ job?.category }}
    .sort-filter-wrapper
    ul.review-list(v-if="reviews[0]")
      li.review-item(v-for="item in reviews")
        .top
          span.name {{ item.name }}
        p.content {{ item.content }}
        .bottom
          button.like
            i.fa-regular.fa-thumbs-up
            span.number {{ item.like }}
          button.dislike
            i.fa-regular.fa-thumbs-down
            span.number {{ item.dislike }}

</template>

<style lang="sass">
@import "/src/sass/detail"
</style>