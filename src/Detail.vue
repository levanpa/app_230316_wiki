<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import * as axios from '@/axios'
import * as dto from '@/dto'
import { useReviewsStore } from './stores/reviews'
import { useNotification } from '@kyvg/vue3-notification'
import NewReview from './components/NewReview.vue'
import ReviewList from './components/ReviewList.vue'

const route = useRoute()
let reviewStore = useReviewsStore()
let reviews: Ref<dto.reviewDto[]> = ref([])
let tempReviews: dto.reviewDto[] | undefined
let job: Ref<dto.jobDto | undefined> = ref()
const jobId: number = parseInt((route.params.id).toString(), 10)
let isShowNewReview: Ref<boolean> = ref(false)
const { notify } = useNotification()

onMounted(async () => {
  await axios.fetchOne('jobs', jobId).then((response) => {
    job.value = response as dto.jobDto
  })
  await axios.ins.get(`http://localhost:3000/reviews?job_id=${jobId}`).then((response) => {
    reviews.value = response.data
  })
})

// todo: finish this
function subscribe(event: Event) {
  event.preventDefault()
}

// emits
function changeVisibility() {
  isShowNewReview.value = !isShowNewReview.value
}

function postReview(data: dto.reviewDto) {
  data.job_id = jobId
  axios.ins.post(`http://localhost:3000/reviews/`, data).then((response) => {
    reviewStore.add([response.data])
    // updateReviewList()
    updateReviewCount()
    changeVisibility()
    data.content = ''
  })

  // todo: fix this
  function updateReviewList() {
    tempReviews = reviewStore.get(jobId)
    if (tempReviews && tempReviews[0]) {
      reviews.value = tempReviews
      notify({
        text: 'Your review has been published.',
      })
    } else {
      notify({
        text: 'Can not update review list.',
        type: 'warn'
      })
    }
  }

  function updateReviewCount() {
    if (job.value?.review_counter) {
      job.value.review_counter++
    }
    axios.ins.put(`http://localhost:3000/jobs/${jobId}`, job.value).then(() => {
      console.log('updated review counter')
    })
  }
}
</script>

<template lang="pug">
.detail-component
  .layout-wrapper
    .job-item(v-if="job")
      img.job-image(:src="job.img", alt="")
      .job-info
        .job-name.has-icon
          i.fa-solid.fa-briefcase
          span.name {{ job.name }}
        .job-location.has-icon
          i.fa-solid.fa-location-dot
          span {{ job.review_counter }} reviews
        .job-field.has-icon
          i.fa-regular.fa-map
          span {{ job.category }}
      .actions
        button.write-review(@click="changeVisibility()") Write review
        button.subscribe Subscribe for notifications
    //- todo: v-else
    NewReview(:isShow="isShowNewReview" @change-visibility="changeVisibility" @post-review="postReview")

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
          option(value="1") Useful reviews only
          option(value="2") Not useful reviews only
      button.apply-button Apply
    ReviewList(:data="reviews" :jobId="jobId")
  .bottom-banner
</template>

<style lang="sass">
@import "/src/sass/detail"
</style>