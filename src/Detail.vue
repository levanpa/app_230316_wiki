<script setup lang="ts">
</script>

<template lang="pug">
.detail-component
  .layout-wrapper
    .job-item
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
    .sort-filter-wrapper
    ul.review-list
      each i in Array(4)
        li.review-item
          .top
            span.name Giau ten
          p.content Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi vel eius assumenda quidem ea expedita reiciendis dolorum molestias aut reprehenderit. In necessitatibus unde tenetur delectus pariatur rerum laudantium fugit voluptatem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi vel eius assumenda quidem ea expedita reiciendis dolorum molestias aut reprehenderit. In necessitatibus unde tenetur delectus pariatur rerum laudantium fugit voluptatem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi vel eius assumenda quidem ea expedita reiciendis dolorum molestias aut reprehenderit. In necessitatibus unde tenetur delectus pariatur rerum laudantium fugit voluptatem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi vel eius assumenda quidem ea expedita reiciendis dolorum molestias aut reprehenderit. In necessitatibus unde tenetur delectus pariatur rerum laudantium fugit voluptatem. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi vel eius assumenda quidem ea expedita reiciendis dolorum molestias aut reprehenderit. In necessitatibus unde tenetur delectus pariatur rerum laudantium fugit voluptatem.
          .bottom
            button.like
              i.fa-regular.fa-thumbs-up
              span.number 127
            button.dislike
              i.fa-regular.fa-thumbs-down
              span.number 32

</template>

<style lang="sass">
@import "/src/sass/detail"
</style>