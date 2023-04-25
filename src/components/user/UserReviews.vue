<script setup lang="ts">
</script>

<template lang="pug">
.user-default-component
  .review-list-wrapper
    .title.no-link
      h3 Recently reviews
      i.fa-solid.fa-angles-right
    ul.recent-review-list
      each i in Array(6)
        li.review-item
          .top
            span.name You
            span recently reviews about
            span.job Designer
          .time
            span 21
            span minutes ago
          p.content Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam exercitationem ullam, eaque itaque, at deleniti saepe animi nihil totam error odio autem? Quod sequi hic unde sit odit et.
          router-link.item-link(to="/#")
            span Go to
            i.fa-solid.fa-angle-right
</template>

<style lang="sass">
</style>