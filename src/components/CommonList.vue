<script setup lang="ts">
import * as dto from '../dto'

defineProps<{
  data: dto.commonListInterface[],
  options: dto.anyObj
}>()
</script>

<template lang="pug">
.common-list-component
  ul(v-if="data && data[0]")
    //- todo: limit
    li.common-item(v-for="item in data")
      router-link.common-link(:to="item.url")
        .top
          span.name {{ item.name }}
          span.text {{ item.text }}
          span.job {{ item.job }}
        .time
          span.number 21
          span.text minutes ago
        p.content(v-if="options && options.hasContent") {{ item.content }}
  p.no-data(v-else) There is no data.
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
    .time
      background-color: #eee
      span
        margin: 4px
        color: #888
    .content
      color: #555
      text-align: justify
      @include line-clamp(2)

+mb
  .common-list-component
    padding: 5rem 10rem
    .common-item
      padding: 10rem 15rem
    .common-link
      gap: 5rem
      .top span
        margin-right: 5rem
      .name, .job
        font-size: 18rem
      .time
        span
          margin: 4rem
</style>
