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
.main-content-component
  ul.job-list
    each i in Array(5)
      li.job-item
        a.job-link(href="#")
          img.job-image(src="/src/assets/logo.svg", alt="")
          .job-info
            .job-name.has-icon
              i.fa-solid.fa-briefcase
              span.name Designer
              span.count &nbsp;(25)
            .job-location.has-icon
              i.fa-solid.fa-location-dot
              span Trong nuoc
            .job-field.has-icon
              i.fa-regular.fa-map
              span Marketing

</template>

<style lang="sass">
@import "/src/sass/main-content"
</style>
