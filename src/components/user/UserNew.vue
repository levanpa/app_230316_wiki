<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { Ref } from 'vue'
import NewReview from '../NewReview.vue'
import axios from 'axios'
import * as dto from '../../dto'
import { useNotification } from '@kyvg/vue3-notification'
import { useRouter } from 'vue-router'

const router = useRouter()
let isShowSuggest: Ref<boolean> = ref(false)
let jobName: Ref<string> = ref('')
let jobField: Ref<string> = ref('')
let editing: string
const { notify } = useNotification()
interface simpleJobInterface {
  id: number | undefined
  name: string
}
let suggestedJobList = reactive<simpleJobInterface[]>([{ id: 0, name: '' }])

console.log()
init()

// post new review for new job
function postReview(reviewData: dto.reviewDto) {
  // create new job
  let job: dto.jobDto = {
    name: jobName.value,
    img: '',
    review_counter: 1,
    category: 0,
    created: Date.now(),
  }
  axios.post(`http://localhost:3000/jobs/`, job).then((response) => {
    notify({
      text: 'Created new job successfully!',
    })
    // create new review
    reviewData.job_id = response.data.id
    axios.post(`http://localhost:3000/reviews/`, reviewData).then((response) => {
      notify({
        text: 'Created new review successfully!',
      })
      // navigate to jo detail page
      router.push({ path: `/detail/${reviewData.job_id}` })
    })
  })
}

function selectSuggest(item: simpleJobInterface) {
  if (editing == 'jobName') {
    jobName.value = item.name
  } else if (editing == 'jobField') {
    jobField.value = item.name
  }
}

watch(jobName, (newValue: string) => {
  isShowSuggest.value = newValue?.length > 2 ? true : false

})
watch(jobField, (newValue: string) => {
  isShowSuggest.value = newValue?.length > 2 ? true : false
})

function getJobList() {
  axios.get(`http://localhost:3000/jobs/`).then((response) => {
    if (response && response.data) {
      let result: dto.jobDto[] = response.data
      suggestedJobList = result.map(({ id, name }) => ({ id, name }))
    }
  }).catch(error => console.log(error))
}

function init() {
  getJobList()
}

</script>

<template lang="pug">
.user-new-component
  .job-wrapper
    .row.job-name
      span.title Job name:
      input(type="text" v-model="jobName" placeholder="Job name" @focus="editing = 'jobName'" @focusout="isShowSuggest = false")
    .row.job-field
      span.title Job field: 
      input(type="text" v-model="jobField" placeholder="Job field" @focus="editing = 'jobField'" @focusout="isShowSuggest = false")

    //- only show when typing at least 3 chars
    .suggest-wrapper(v-show="isShowSuggest")
      h3.suggest-title
        i.fa-regular.fa-circle-xmark(@click="isShowSuggest = false")
        span Suggested results
      ul.suggest-list
        li.suggest-item(v-for="item in suggestedJobList" :job-id="item.id" @click="selectSuggest(item)") {{ item.name }}
  NewReview.is-user-new(:isShow="true" @post-review="postReview")
</template>

<style lang="sass">
.user-new-component
  .job-wrapper
    margin-bottom: 20px
    position: relative
    .row
      margin-bottom: 10px
    .title
      display: inline-block
      min-width: 100px
      margin-right: 5px
    input
      padding: 4px
      border: 1px solid #ccc

  .suggest-wrapper
    width: 300px
    max-height: 200px
    padding: 8px 15px
    overflow: auto scroll
    border-radius: 10px
    box-shadow: 0 0 5px 3px #aaa
    background-color: #fff
    position: absolute
    top: -100px
    right: 0
    .suggest-title
      font-weight: 700
      font-size: 20px
      border-bottom: 1px solid #333
      i
        margin-right: 8px
        margin-bottom: 8px
        cursor: pointer
        font-size: 20px
        transition: all ease 0.2s
        &:hover
          scale: 1.1
          color: #e30000
    .suggest-item
      margin: 2px 0
      padding: 4px
      border-bottom: 1px dashed #ccc
      cursor: pointer
      transition: background-color 0.25s ease
      &:hover
        background-color: #fff4e9

.new-review-component.is-user-new
  display: block
  max-height: unset !important
  .text-area
    width: 100%
    padding-right: 25px
  .rules,
  .cancel-button
    display: none

.rules
  flex-basis: 40%
  padding-top: 25px
  .rule-wrapper
    padding: 10px 18px
    border-radius: 10px
    color: #fff
    background-color: #209cee
  .rule-title
    margin-bottom: 10px
    font-weight: 600
    font-size: 22px
    text-shadow: 1px 2px #3b3ef0
  .rule-content
    text-align: justify
</style>