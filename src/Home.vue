<script setup lang="ts">
import MainContent from './components/MainContent.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template lang="pug">
.layout-wrapper.main-content-wrapper
  MainContent
  Sidebar
</template>

<style lang="sass">
// @import "/src/sass/base/_base"
.main-content-wrapper
  display: grid
  grid-template-columns: 60% calc(40% - 20px)
  padding: 40px 0
  gap: 20px
</style>