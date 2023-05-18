<script setup lang="ts">
import { ref } from 'vue'
import * as dto from '../dto'
import axios from 'axios'
import { countries } from 'country-list-json'
import ReviewReport from './ReviewReport.vue'

const props = defineProps<{ data: dto.reviewDto[], jobId: number }>()

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

function vote(event: Event, reviewID: number, type: string) {
  event.preventDefault()
  let review: dto.reviewDto | undefined = props.data.find(item => item.id == reviewID)
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

function showReportBox(event: Event) {
  event.preventDefault()
  let target: HTMLButtonElement = event.currentTarget as HTMLButtonElement
  let reviewItemElement: HTMLLIElement = target.closest('.review-item') as HTMLLIElement
  let isActive: boolean

  isActive = checkActive(reviewItemElement)
  closeAllReports()
  if (!isActive) openReport()

  function checkActive(reviewItemElement: HTMLLIElement): boolean {
    return reviewItemElement.classList.contains('report-active')
  }
  function openReport() {
    target.classList.add('is-active')
    setTimeout(() => {
      reviewItemElement.classList.add('report-active')
    }, 100)
    reviewItemElement.querySelector('.review-report-component')?.classList.add('is-active')
  }
}

function closeAllReports() {
  const component: HTMLDivElement = document.querySelector('.review-list-component') as HTMLDivElement
  component.querySelectorAll('.review-item.report-active').forEach((item) => {
    item.classList.remove('report-active')
  })
  component.querySelectorAll('.button.report.is-active').forEach((item) => {
    item.classList.remove('is-active')
  })
  component.querySelectorAll('.review-report-component.is-active').forEach((item) => {
    item.classList.remove('is-active')
  })
}
</script>

<template lang="pug">
.review-list-component
  ul.review-list(v-if="data[0]")
    li.review-item(v-for="item in data" :data-id="item.id")
      .top
        h3.name {{ item.name }}
        span.time {{ formattedDate(item.created || 0) }}
      .middle
        .info-wrapper
          p {{ getExperienceText(item.experience || 0) }} kinh nghiệm
          p worked at 
            span.location {{ getCountryName(item.location) }}
        p.content {{ item.content }}
      .bottom
        .button-wrapper
          button.button.like(@click="$event => vote($event, item.id || 0, 'like')")
            i.fa-regular.fa-thumbs-up
            span.number {{ item.like }}
          button.button.dislike(@click="$event => vote($event, item.id || 0, 'dislike')")
            i.fa-regular.fa-thumbs-down
            span.number {{ item.dislike }}
          .report-button-wrapper
            button.button.report(@click="$event => showReportBox($event)")
              i.fa-solid.fa-triangle-exclamation
            ReviewReport(:jobId="jobId" :reviewId="item.id || 0" @close-all-reports="closeAllReports")
  p(v-else) There are no reviews.
</template>

<style lang="sass">
// @import "/src/sass/review-list"
.review-list-component
  .review-item
    margin-bottom: 30px
    border-radius: 10px
    border: 1px solid #bbb
    filter: drop-shadow(0 3px 3px #92a3d7)
    &.report-active
      position: relative
      z-index: 1

  .top
    display: flex
    align-items: center
    padding: 5px 20px
    background-color: #f5f5f5
    border-top-left-radius: 10px
    border-top-right-radius: 10px
  .name
    display: inline-block
    margin-right: 5px
    font-size: 20px
    font-weight: 700
  .time
    margin-left: auto
    color: #666

  .middle
    display: flex
    gap: 15px
    padding: 10px 20px
    background-color: #fff
    border-top: 1px solid #bbb
    border-bottom: 1px solid #bbb
  .info-wrapper
    min-width: 180px
    max-width: 240px
    color: #666
  .content
    flex-basis: 100%
    padding-left: 15px
    text-align: justify
    color: #333
    border-left: 1px solid #bbb

  .bottom
    display: flex
    gap: 20px
    padding: 10px 20px
    background-color: #f5f5f5
    border-bottom-left-radius: 10px
    border-bottom-right-radius: 10px
    .button
      display: inline-flex
      align-items: center
      gap: 10px
      padding: 4px 10px
      border-radius: 50px
      transition: background-color ease 0.2s
      &:hover
        background-color: #fff
      &.is-active
        background-color: #333
    i
      font-size: 24px
  .like i
    color: #19c819
  .dislike i
    color: #1184ff
  .report > i
    color: #e32525
  .report-button-wrapper
    display: inline-block
    position: relative
    
</style>
