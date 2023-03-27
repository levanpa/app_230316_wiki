<script setup lang="ts">
import { ref } from 'vue'
import CardMenu from './CardMenu.vue'
defineProps<{ title: string }>()
let hidden = ref(true)

function handleMenu($event: Event) {
  $event.preventDefault()
  hidden.value = !hidden.value
}
</script>

<template lang="pug">
.card-component
  .card-wrapper
    .side-bar
      a.menu-icon(href="#" @click="$event => handleMenu($event)")
        i.fa-solid.fa-bars
      ul.menu-wrapper
        each job in ["Artists", "Musicians", "Writers", "Architects", "Politicians", "Actors", "Athletes"]
          li.menu-item
            a.menu-link(href="#")= job
      a.search-icon(href="#")
        i.fa-solid.fa-magnifying-glass
    .main-content
      h1.page-title {{title}}
      .images-wrapper
        .images-list
          each i in Array(3)
            .image-item
      .content-wrapper
        p.content Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est eum eveniet perspiciatis cupiditate fugiat unde reprehenderit officia hic ab optio modi, soluta ipsum debitis explicabo. Distinctio cupiditate maxime repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est eum eveniet perspiciatis cupiditate fugiat unde reprehenderit officia hic ab optio modi, soluta ipsum debitis explicabo. Distinctio cupiditate maxime repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est eum eveniet perspiciatis cupiditate fugiat unde reprehenderit officia hic ab optio modi, soluta ipsum debitis explicabo.
  CardMenu(:isHidden="hidden")
  .menu-background(:class="{'is-hidden': hidden}" @click="$event => handleMenu($event)")
</template>

<style lang="sass">
@import "/src/sass/card"
</style>
