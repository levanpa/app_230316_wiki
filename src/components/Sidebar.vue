<script setup lang="ts">
import CommonList from './CommonList.vue'
let listRecentlyData = {
  name: 'Trần Nguyễn Thanh Tú',
  text: 'recently reviews about',
  job: 'Designer',
}
</script>

<template lang="pug">
.sidebar-component
  p.sidebar-title Recently reviews
  p.sidebar-info Các review có thể mang tính chủ quan. Hãy xem những review này như là nhận xét, trải nghiệm, đánh giá của những người đã có kinh nghiệm.
  CommonList(:data="listRecentlyData" :options="{ hasContent: true }")
</template>

<style lang="sass">
@import "/src/sass/sidebar"
</style>

<style lang="sass" scoped>
.common-list-component
  padding: 0
</style>