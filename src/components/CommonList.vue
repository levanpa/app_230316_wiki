<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
defineProps<{
  data: any,
  options: any
}>()

</script>

<template lang="pug">
ul.common-list-component
  li.common-item(v-for="item in Array((options && options.limit) || 3)")
    router-link.common-link(to="/#")
      .top
        span.name {{ data.name }}
        span.text {{ data.text }}
        span.job {{ data.job }}
      .time
        span.number 21
        span.text minutes ago
      p.content(v-if="options && options.hasContent") Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi vel officia nam maxime iure earum sunt, dolorum saepe ut sit necessitatibus eum recusandae consectetur culpa iste, debitis reprehenderit ab nobis!
</template>

<style lang="sass">
// @import "/src/sass/common-list"
.common-list-component
  padding: 5px 10px
  .common-item
    padding: 10px 15px
    transition: background-color ease 0.2s
    &:not(:last-child)
      border-bottom: 1px dashed #ccc
    &:hover
      background-color: #f0f0f0
  .common-link
    display: flex
    flex-direction: column
    align-items: start
    gap: 5px
    .top span
      margin-right: 5px
    .name, .job
      font-weight: 700
      font-size: 18px
    .job
      color: $color1
    .time span
      margin-right: 5px
      color: #888
    .content
      color: #555
      text-align: justify
      @include line-clamp(2)
</style>
