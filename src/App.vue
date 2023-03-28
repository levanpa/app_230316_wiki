<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import TopBanner from './components/TopBanner.vue'
onMounted(() => {
  // reduce layout change
  document.getElementById('app')?.classList.add('is-show')
})
</script>

<template lang="pug">
Header
TopBanner
router-view
Footer
</template>

<style lang="sass">
@import "/src/sass/base/_base"
</style>