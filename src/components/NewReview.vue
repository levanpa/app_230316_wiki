<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { countries } from 'country-list-json'
import axios from 'axios'
import * as dto from '../dto'
// import { useReviewsStore } from '../stores/reviews'

const props = defineProps<{
  isShow: boolean,
  jobId: number
}>()

const emit = defineEmits(['change-visibility', 'post-review'])

let data: dto.reviewDto = reactive({
  name: '',
  content: '',
  location: 'VN',
  like: 0,
  dislike: 0,
  job_id: 0,
  created: 0,
  experience: 0,
})
let experienceNumber: Ref<number> = ref(1)
let experienceUnit: Ref<number> = ref(365)

function postReview(event: Event) {
  event.preventDefault()
  data.job_id = props.jobId
  data.name = 'ten cua user'
  data.experience = experienceNumber.value * experienceUnit.value
  data.created = Date.now()

  axios.post(`http://localhost:3000/reviews/`, data).then((response) => {
    emit('post-review', response.data)
    experienceNumber = 1
    experienceUnit = 365
    data.content = ''
  })
}
</script>

<template lang="pug">
.new-review-component(:class="{ 'is-show': isShow }")
  .text-area
    .options
      .experience
        span.title Experience: 
        input.experience-number(type="number" v-model.number="experienceNumber")
        select(v-model="experienceUnit")
          option(value="365" selected) years
          option(value="30") months
          option(value="1") days
      .location
        span.title Location:
        select(v-model="data.location")
          option(v-for="item in countries" :value="item.code" :selected="item.code == 'VN'") {{item.name}}
    textarea.review-content(v-model="data.content" placeholder="Write your review here")
    .button-wrapper
      button.cancel-button(@click="$event => $emit('change-visibility', $event)") Cancel
      button.submit-button(@click="$event => postReview($event)") Post this review
  .rules
    .rule-wrapper
      h3.rule-title Rules and recommendations
      p.rule-content Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis neque, eius praesentium cumque veniam repudiandae, consectetur doloremque placeat earum, ducimus sunt dignissimos sapiente distinctio ipsa incidunt sequi aperiam tempora tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime minus earum odit, obcaecati delectus repellendus suscipit eius, mollitia soluta atque laudantium officiis eaque eligendi. Est nemo hic odio dignissimos repellendus!
</template>

<style lang="sass" scoped>
@import "/src/sass/new-review"
</style>
