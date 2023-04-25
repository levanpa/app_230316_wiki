<script setup lang="ts">
</script>

<template lang="pug">
.user-votes-component
  .vote-list-wrapper
    .title.no-link
      h3 Recently votes
      i.fa-solid.fa-angles-right
    ul.recent-vote-list
      each i in Array(6)
        li.review-item
          .top
            span.name You
            span recently vote this review in
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