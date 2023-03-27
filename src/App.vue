<script setup lang="ts">
import { onMounted } from "vue"
import Header from './components/Header.vue'
import TopBanner from './components/TopBanner.vue'
import Body from './Body.vue'
import Detail from './Detail.vue'
onMounted(() => {
  document.getElementById('app')?.classList.add('is-show')
})
</script>

<template lang="pug">
Header
TopBanner
//- Body
Detail
</template>

<style lang="sass">
@import "/src/sass/base/_base"
</style>