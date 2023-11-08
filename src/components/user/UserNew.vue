<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { Ref } from 'vue'
import NewReview from '../NewReview.vue'
import * as axios from '@/axios'
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
  let job: dto.jobDto = {
    name: jobName.value,
    img: 'https://placehold.co/90',
    review_counter: 1,
    category: 0,
    is_public: true,
  }

  axios.ins.post(`http://localhost:3000/reviews/add`, { job, reviewData }).then((response) => {
    notify({
      text: 'Created (new job) successfully!',
    })
    // navigate to jo detail page
    // router.push({ path: `/detail/${response.jobId}` })
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
  axios.ins.get(`http://localhost:3000/jobs/`).then((response) => {
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
@import "/src/sass/user-new"
</style>