<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import TopBanner from './components/TopBanner.vue'
import * as utils from '@/utils'

onMounted(() => {
  if (utils.isMobile()) {
    document.getElementsByTagName('html')[0]?.classList.add('is-mobile')
  }
  // reduce layout change
  document.getElementById('app')?.classList.add('is-show')
})
</script>

<template lang="pug">
Header
TopBanner
router-view
Footer
//- Notifications
Notifications.notification-component(position="bottom right" pauseOnHover="true")
</template>

<style lang="sass">
@import "/src/sass/base/_base"
</style>