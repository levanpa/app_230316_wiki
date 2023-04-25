<script setup lang="ts">
import { ref } from 'vue'
import { dbWrite } from '../../db'
// defineProps<{ title: string }>()

function addJob($event: Event) {
  $event.preventDefault()
  const job = {
    job_id: 'new job',
    name: 'hotel waitress',
    img: 'no-img',
    review_counter: 125,
    location: 'inland',
    category: 12,
    created: Date.now()
  }

  dbWrite(job).then((response) => {
    console.log('response', response)
  })
}
</script>

<template lang="pug">
header.header-component
  .layout-wrapper.header-wrapper
    .left
      router-link.header-logo(to="/")
        img(src="/src/assets/logo.svg" alt="logo")
        span Job Review
    .right
      router-link.header-user(to="/user")
        i.fa-solid.fa-user
        | User
</template>

<style lang="sass">
@import "/src/sass/header"
</style>
