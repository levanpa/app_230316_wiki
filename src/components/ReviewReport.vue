<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '../dto'
import axios from 'axios'
import { useNotification } from '@kyvg/vue3-notification'
const emit = defineEmits(['close-all-reports'])

const props = defineProps<{
  jobId: number,
  reviewId: number,
}>()

const { notify } = useNotification()
let reportContent: Ref<string> = ref('')
let reportData: dto.reportDto = {
  job_id: 0,
  review_id: 0,
  content: '',
}

// todo: finish this
function sendReport(event: Event) {
  event.preventDefault()

  if (!reportContent.value) {
    notify({
      text: 'Content is empty',
      type: 'warn',
    })
    return
  }

  reportData = {
    job_id: props.jobId,
    review_id: props.reviewId,
    content: reportContent.value,
    created: Date.now()
  }

  axios.post(`http://localhost:3000/reports/`, reportData).then(() => {
    notify({
      text: 'Your have reported this review.',
    })
    emit('close-all-reports')
    reportContent.value = ''
  }).catch(error => {
    notify({
      text: error.message,
      type: 'error',
    })
  })
}
</script>

<template lang="pug">
.review-report-component
  .report-wrapper
    .left
      textarea.report-content(v-model="reportContent" placeholder="What's the problem about this review?")
    .right
      button.send-button(@click="sendReport($event)")
        i.fa-regular.fa-paper-plane
</template>

<style lang="sass">
// @import "/src/sass/review-report"
.review-report-component
  width: 0
  height: 0
  visibility: hidden
  opacity: 0
  position: absolute
  top: 10px
  left: 50px
  z-index: 100
  background-color: #fff
  border-radius: 0 10px 10px
  border: 1px solid #bd9b9b
  filter: drop-shadow(0 3px 3px #d79292)
  transition-property: width, height, opacity, visibility
  transition-duration: 0.2s
  transition-timing-function: ease-out
  &.is-active
    width: 800px
    height: 200px
    opacity: 1
    visibility: visible

  .report-wrapper
    display: flex
    align-items: flex-end
    height: 100%
    gap: 35px
    padding: 15px
    .left
      width: 85%
      height: 100%
    .report-content
      width: 100%
      height: 100%
      padding: 6px 10px
      border: 1px solid #ccc
    .right
      width: 15%
    button
      width: 100%
      height: 40px
      border-radius: 40px
      background-color: #00b300
      color: #fff
      font-size: 24px
      transition: opacity ease 0.2s
      &:hover
        opacity: 0.8 
</style>
