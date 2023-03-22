<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string }>()

const likeCount = ref(0)
</script>

<template lang="pug">
.card-component
  .card-wrapper
    .side-bar
      a.menu-icon(href="#")
        i.fa-solid.fa-bars
      .menu-wrapper
        ul
          each job in ["Artists", "Musicians", "Writers", "Architects", "Politicians", "Actors", "Athletes"]
            li.menu-item
              a.menu-link(href="#")= job
      a.search-icon(href="#")
        i.fa-solid.fa-magnifying-glass
    .main-content
      h1.page-title {{title}}
      .images-wrapper.overflow-scroll
        .images-list
          each i in Array(3)
            .image-item
      .content-wrapper
        p.content Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est eum eveniet perspiciatis cupiditate fugiat unde reprehenderit officia hic ab optio modi, soluta ipsum debitis explicabo. Distinctio cupiditate maxime repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est eum eveniet perspiciatis cupiditate fugiat unde reprehenderit officia hic ab optio modi, soluta ipsum debitis explicabo. Distinctio cupiditate maxime repudiandae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis est eum eveniet perspiciatis cupiditate fugiat unde reprehenderit officia hic ab optio modi, soluta ipsum debitis explicabo.
</template>

<style lang="sass">
@import "/src/sass/card"
</style>
