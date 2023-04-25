<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as dto from './dto'
import { useJobsStore } from './stores/jobs'
import { useReviewsStore } from './stores/reviews'
import NewReview from './components/NewReview.vue'

const route = useRoute()
let jobStore = useJobsStore()
let reviewStore = useReviewsStore()
let reviews: Ref<dto.reviewDto[]> = ref([])
let tempReviews: dto.reviewDto[] | undefined
let job: Ref<dto.jobDto | undefined> = ref()
let tempJob: dto.jobDto[] | undefined
const jobId: string = (route.params.id).toString()
let isShowNewReview: Ref<boolean> = ref(false)

fetchData()

function fetchData() {
  // check if there is data in store
  tempJob = jobStore.get(jobId)
  if (tempJob && tempJob[0]) {
    job.value = tempJob[0]
  } else {
    axios.get(`http://localhost:3000/jobs/${jobId}`).then((response) => {
      job.value = response.data
      job.value && jobStore.add([job.value])
    })
  }

  tempReviews = reviewStore.get(jobId)
  if (tempReviews && tempReviews[0]) {
    reviews.value = tempReviews
  } else {
    axios.post('http://localhost:3000/reviews', {
      type: 'query',
      options: {
        where: {
          job_id: jobId
        }
      }
    }).then((response) => {
      reviews.value = response.data
      reviews.value && reviewStore.add(reviews.value)
    })
  }
}

function changeVisibility(event: Event) {
  event.preventDefault()
  isShowNewReview.value = !isShowNewReview.value
}

function like(reviewID: number) {
  let currentLike: number | undefined = reviews.value.find(item => item.id == reviewID)?.like
  if (!currentLike) {
    console.log('ko tim thay so like')
    return
  }
  console.log('currentLike', currentLike)
  axios.post(`http://localhost:3003/reviews/${reviewID}`, {
    like: 193
  }).then((response) => {
    console.log('like thanh cong', response)
  }).catch((error) => {
    console.log(error)
  })
}
</script>

<template lang="pug">
.detail-component
  .layout-wrapper
    .job-item
      img.job-image(:src="job?.img", alt="")
      .job-info
        .job-name.has-icon
          i.fa-solid.fa-briefcase
          span.name {{ job?.name }}
          span.count ({{ job?.review_counter }})
        .job-location.has-icon
          i.fa-solid.fa-location-dot
          span {{ job?.location }}
        .job-field.has-icon
          i.fa-regular.fa-map
          span {{ job?.category }}
      .actions
        button.write-review(@click="$event=>changeVisibility($event)") Write review
        button.subscribe Subscribe for notifications
    NewReview(:isShow="isShowNewReview" @change-visibility="changeVisibility")
    .sort-filter-wrapper
      .sort-wrapper
        span Sort by:
        select
          option(value="0") None
          option(value="1") Created time increase
          option(value="2") Created time decrease
          option(value="3") Most useful first
          option(value="4") Most nonsense first
      .filter-wrapper
        span Filter by:
        select
          option(value="0") None
          option(value="1") Useful review only
          option(value="2") Created time decrease
          option(value="3") Most useful first
          option(value="4") Most nonsense first
      button.apply-button Apply

    ul.review-list(v-if="reviews[0]")
      li.review-item(v-for="item in reviews")
        .top
          h3.name {{ item.name }}
          span ({{ 'item.experience' }} kinh nghiệm)
          span.time {{ 'item.created' }}
        p.content {{ item.content }}
        .bottom
          button.like(@click="$event => like(item.id)")
            i.fa-regular.fa-thumbs-up
            span.number {{ item.like }}
          button.dislike
            i.fa-regular.fa-thumbs-down
            span.number {{ item.dislike }}
    p(v-else) There are no reviews.

</template>

<style lang="sass">
@import "/src/sass/detail"
</style>