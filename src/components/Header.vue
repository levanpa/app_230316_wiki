<script setup lang="ts">
import { ref } from 'vue'
import { useDefaultStore } from '@/stores/default'

let defaultStore = useDefaultStore()
let userName = ref(defaultStore.getUser().name)

</script>

<template lang="pug">
header.header-component
  .layout-wrapper.header-wrapper
    .left
      router-link.header-logo(to="/")
        img(src="/src/assets/logo.svg" alt="logo")
        span Job Review
    .right
      router-link.header-user(to="/user")
        i.fa-solid.fa-user
        | {{ userName || 'Guest' }}
</template>

<style lang="sass">
@import "/src/sass/header"
</style>
