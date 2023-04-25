<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import NewReview from '../NewReview.vue'


let isShowSuggest: Ref<boolean> = ref(false)

// post new review for new job
function postReview() {

}
// suggest Job/Field
function suggest(event: Event, type: string) {
  event.preventDefault()
  let input: HTMLInputElement = event.target as HTMLInputElement
  isShowSuggest.value = input.value.length > 2 ? true : false
}
</script>

<template lang="pug">
.user-new-component
  .job-wrapper
    .row.job-name
      span.title Job name: 
      input(type="text" placeholder="Job name" @input="$event => suggest($event, 'job')")
    .row.job-field
      span.title Job field: 
      input(type="text" placeholder="Job field" @input="$event => suggest($event, 'filed')")
    //- only show when typing at least 3 chars
    .suggest-wrapper(v-show="isShowSuggest")
      p.suggest-title Suggested results
      ul.suggest-list
        li.suggest-item Designer
        li.suggest-item Graphic Designer
        li.suggest-item UI/UX Designer
        li.suggest-item Architectural Designer
        li.suggest-item Lead Designer
  NewReview(:isShow="true" @post-review="postReview")
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
    .suggest-item
      margin: 2px 0
      padding: 4px
      border-bottom: 1px dashed #ccc
      cursor: pointer
      transition: background-color 0.25s ease
      &:hover
        background-color: #fff4e9

.new-review-component.is-show
  display: block
  max-height: unset !important
  .text-area
    width: 100%
    padding-right: 25px
  .rules
    display: none
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