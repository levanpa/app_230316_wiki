<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDefaultStore } from '@/stores/default'
import * as dto from '@/dto'

const defaultStore = useDefaultStore()
let userName = ref('Guest')

defaultStore.$subscribe((mutation, state) => {
  userName.value = state.user.name
})

onMounted(() => {
  userName.value = defaultStore.user.name || 'Guest'
})
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
        | {{ userName }}
</template>

<style lang="sass">
@import "/src/sass/header"
</style>
