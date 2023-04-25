<script setup lang="ts">
import { countries } from 'country-list-json'
defineProps<{
  isShow: boolean
}>()

defineEmits(['change-visibility', 'post-review'])

// function cancelReview(event: Event) {
//   event.preventDefault()

// }
</script>

<template lang="pug">
.new-review-component.is-show
  .text-area
    .options
      .experience
        span.title Experience: 
        input.experience-number(type="number")
        select
          option(value="year" selected) years
          option(value="month") months
          option(value="day") days
      .location
        span.title Location:
        select
          option(v-for="item in countries" :value="item.code" :selected="item.code == 'VN'") {{item.name}}
    textarea.review-content(placeholder="Write your review here")
    .button-wrapper
      button.cancel-button(@click="$event => $emit('change-visibility', $event)") Cancel
      button.submit-button(@click="$event => $emit('post-review', $event)") Post this review
  .rules
    .rule-wrapper
      h3.rule-title Rules and recommendations
      p.rule-content Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis neque, eius praesentium cumque veniam repudiandae, consectetur doloremque placeat earum, ducimus sunt dignissimos sapiente distinctio ipsa incidunt sequi aperiam tempora tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime minus earum odit, obcaecati delectus repellendus suscipit eius, mollitia soluta atque laudantium officiis eaque eligendi. Est nemo hic odio dignissimos repellendus!
</template>

<style lang="sass" scoped>
@import "/src/sass/new-review"
</style>
