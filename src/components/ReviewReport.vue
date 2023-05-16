<script setup lang="ts">
import { ref } from 'vue'
import * as dto from '../dto'
import axios from 'axios'
import { countries } from 'country-list-json'

// const props = defineProps<{ data: dto.reviewDto[] }>()


// todo: finish this
function reportReview(event: Event, reviewID: number) {
  event.preventDefault()
  console.log('building reportReview...')
}
</script>

<template lang="pug">
.review-report-component
  .report-wrapper


</template>

<style lang="sass">
// @import "/src/sass/review-report"
.review-report-component
  width: 0
  height: 0
  visibility: hidden
  opacity: 0
  position: absolute
  top: calc(100% - 40px)
  left: 215px
  z-index: 100
  background-color: #fff
  border-radius: 10px
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
 
</style>
