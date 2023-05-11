<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as dto from './dto'
import { useJobsStore } from './stores/jobs'
import { useReviewsStore } from './stores/reviews'
import NewReview from './components/NewReview.vue'
import { useNotification } from '@kyvg/vue3-notification'
import { countries } from 'country-list-json'

const route = useRoute()
let jobStore = useJobsStore()
let reviewStore = useReviewsStore()
let reviews: Ref<dto.reviewDto[]> = ref([])
let tempReviews: dto.reviewDto[] | undefined
let job: Ref<dto.jobDto | undefined> = ref()
let tempJob: dto.jobDto[] | undefined
const jobId: number = parseInt((route.params.id).toString(), 10)
let isShowNewReview: Ref<boolean> = ref(false)
const { notify } = useNotification()

fetchData()

function formattedDate(date: number): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  return new Intl.DateTimeFormat('vi-VN', options).format(date)
}

function getExperienceText(exp: number): string {
  let years: number = Math.floor(exp / 365)
  let months: number = Math.floor((exp % 365) / 30)
  let days: number = (exp % 365) % 30
  let result: string = ''
  result += years > 0 ? `${years} years ` : ''
  result += months > 0 ? `${months} months ` : ''
  result += days > 0 ? `${days} days` : ''
  return result.trim() || '0'
}
function getCountryName(code: string): string {
  const target = countries.find((item) => item.code == code)
  return target?.name || 'nowhere'
}

function fetchData() {
  // check if there is data in store
  tempJob = jobStore.get(jobId)
  if (tempJob && tempJob[0]) {
    console.log('fetched data from store')
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
    // for nestjs
    // axios.post('http://localhost:3000/reviews', {
    // type: 'query',
    // options: {
    //   where: {
    //     job_id: jobId
    //   }
    // }
    axios.get(`http://localhost:3000/reviews?job_id=${jobId}`, {
    }).then((response) => {
      reviews.value = response.data
      reviews.value && reviewStore.add(reviews.value)
    })
  }

}

function vote(event: Event, reviewID: number, type: string) {
  event.preventDefault()
  let review: dto.reviewDto | undefined = reviews.value.find(item => item.id == reviewID)
  if (review?.[type] || review?.[type] == 0) {
    review[type]++
  } else {
    console.log('ko tim thay so vote')
    return
  }

  axios.put(`http://localhost:3000/reviews/${reviewID}`, review).catch((error) => {
    console.log(error.message)
  })
}

// todo: finish this
function reportReview(event: Event, reviewID: number) {
  event.preventDefault()
  console.log('building reportReview...')
}

// todo: finish this
function subscribe(event: Event) {
  event.preventDefault()
}

// emits
function changeVisibility(event: Event) {
  event.preventDefault()
  isShowNewReview.value = !isShowNewReview.value
}

function postReview(data: dto.reviewDto) {
  reviewStore.add([data])
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
        button.write-review(@click="$event=>changeVisibility($event)") Write review
        button.subscribe Subscribe for notifications
    //- todo: v-else
    NewReview(:isShow="isShowNewReview" :jobId="jobId" @change-visibility="changeVisibility" @post-review="postReview")

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

    ul.review-list(v-if="reviews[0]")
      li.review-item(v-for="item in reviews")
        .top
          h3.name {{ item.name }}
          span.time {{ formattedDate(item.created || 0) }}
        .middle
          .info-wrapper
            p {{ getExperienceText(item.experience) }} kinh nghiệm
            p worked at {{ getCountryName(item.location) }}
          p.content {{ item.content }}
        .bottom
          .button-wrapper
            button.like(@click="$event => vote($event, item.id || 0, 'like')")
              i.fa-regular.fa-thumbs-up
              span.number {{ item.like }}
            button.dislike(@click="$event => vote($event, item.id || 0, 'dislike')")
              i.fa-regular.fa-thumbs-down
              span.number {{ item.dislike }}
            button.report(@click="$event => reportReview($event, item.id || 0)")
              i.fa-solid.fa-triangle-exclamation

    p(v-else) There are no reviews.

</template>

<style lang="sass">
@import "/src/sass/detail"
</style>