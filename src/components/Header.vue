<script setup lang="ts">
// import { ref } from 'vue'
// defineProps<{ title: string }>()
// let hidden = ref(true)

// function handleMenu($event: Event) {
//   $event.preventDefault()
//   hidden.value = !hidden.value
// }
</script>

<template lang="pug">
header.header-component
  .layout-wrapper
    .left
      a.header-logo(href="#")
        img(src="/src/assets/logo.svg" alt="logo")
        span Job Review
    .right
</template>

<style lang="sass">
@import "/src/sass/header"
</style>
