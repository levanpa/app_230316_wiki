<script setup lang="ts">
</script>

<template lang="pug">
.sidebar-component
  p.sidebar-title Recently reviews
  p.sidebar-info Các review có thể mang tính chủ quan. Hãy xem những review này như là nhận xét, trải nghiệm, đánh giá của những người đã có kinh nghiệm.
  ul.recent-review-list
    each i in Array(3)
      li.review-item
        .top
          span.name Trần Nguyễn Thanh Tú
          span recently reviews about
          span.job Designer
        .time
          span.number 21
          span minutes ago
        p.content Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam exercitationem ullam, eaque itaque, at deleniti saepe animi nihil totam error odio autem? Quod sequi hic unde sit odit et.
  
</template>

<style lang="sass">
@import "/src/sass/sidebar"
</style>
