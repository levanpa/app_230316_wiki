<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '../dto'
import axios from 'axios'
import { countries } from 'country-list-json'
import ReviewReport from './ReviewReport.vue'

const props = defineProps<{ data: dto.reviewDto[], jobId: number }>()

let menuRef: Ref<null | HTMLDivElement> = ref(null)
let componentRef: Ref<null | HTMLDivElement> = ref(null)

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

function vote(reviewID: number, type: string) {
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

function toggleMenu(event: Event, targetId: number) {
  const targetOffsets = (event.target as HTMLDivElement).getBoundingClientRect()
  const componentOffsets = (componentRef.value as HTMLDivElement).getBoundingClientRect()
  let menu = menuRef.value as HTMLDivElement
  let menuCurrentId = parseInt(menu.dataset.targetId || '0', 10)

  if (menuCurrentId == targetId) {
    close()
  } else {
    open()
  }

  function open() {
    menu.style.top = `${targetOffsets.top - componentOffsets.top + 35}px`
    menu.classList.add('is-active')
    menu.dataset.targetId = targetId.toString()
  }

  function close() {
    menu.classList.remove('is-active')
    menu.dataset.targetId = '0'
  }
}

function deleteReview(event: Event) {
  const target = event.target as HTMLAnchorElement
  let menu = menuRef.value as HTMLDivElement
  let reviewId = parseInt(menu.dataset.targetId || '0', 10)
  // post delete api
  console.log('delete review: ', reviewId)
}
</script>

<template lang="pug">
.review-list-component(ref="componentRef")
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
        .button-buttons
          button.button.like(@click.prevent="vote(item.id || 0, 'like')")
            i.fa-regular.fa-thumbs-up
            span.number {{ item.like }}
          button.button.dislike(@click.prevent="vote(item.id || 0, 'dislike')")
            i.fa-regular.fa-thumbs-down
            span.number {{ item.dislike }}
          .report-button-wrapper
            button.button.report(@click.prevent="$event => showReportBox($event)")
              i.fa-solid.fa-triangle-exclamation
            ReviewReport(:jobId="jobId" :reviewId="item.id || 0" @close-all-reports="closeAllReports")
        .admin-function
          button.button.menu(@click.prevent="$event => toggleMenu($event, item.id || 0)")
            i.fa-solid.fa-ellipsis-vertical
  p(v-else) There are no reviews.
  .admin-menu(ref="menuRef" :data-target-id="0")
    ul.wrapper
      li.menu-item
        a.menu-link(href="#" @click.prevent="") Edit
      li.menu-item
        a.menu-link(href="#" @click.prevent="") Bookmark
      li.menu-item
        a.menu-link(href="#" @click.prevent="$event => deleteReview($event)") Delete
</template>

<style lang="sass">
@import "/src/sass/review-list"    
</style>
