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
  grid-template-columns: 550px 400px
  padding-top: 40px
  gap: 50px
</style>