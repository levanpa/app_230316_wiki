<script setup lang="ts">
</script>

<template lang="pug">
.sidebar-component
  span.sidebar-title Recently reviews
  ul.recent-review-list
    each i in Array(3)
      li.review-item
        .top
          span.name Anonymous
          span &nbsp;recently reviews about&nbsp;
          span.job Designer
        .time
          span 21
          span &nbsp;minutes ago
        p.content Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam exercitationem ullam, eaque itaque, at deleniti saepe animi nihil totam error odio autem? Quod sequi hic unde sit odit et.
  
</template>

<style lang="sass">
@import "/src/sass/sidebar"
</style>
