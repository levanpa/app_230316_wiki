<script setup lang="ts">
// import { ref } from 'vue'
// import CardMenu from './CardMenu.vue'
// defineProps<{ title: string }>()
// let hidden = ref(true)

// function handleMenu($event: Event) {
//   $event.preventDefault()
//   hidden.value = !hidden.value
// }
</script>

<template lang="pug">
.top-banner-component
  .bg-overlay
  .layout-wrapper
    h1.top-banner-title Review các công việc, ngành nghề của người Việt
    .job-search
      input.job-input(type="text", placeholder="Job name")
      i.fa-solid.fa-magnifying-glass-dollar
      
</template>

<style lang="sass">
@import "/src/sass/top-banner"
</style>
