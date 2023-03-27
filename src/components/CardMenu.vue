<script setup lang="ts">
const props = defineProps<{ isHidden: boolean }>()
</script>

<template lang="pug">
.card-menu-component(:class="{'is-hidden': isHidden}")
  span this is the menu of the card
</template>

<style lang="sass">
// @import "/src/sass/card-menu"
.card-menu-component
  width: 300px
  height: 400px
  padding-top: 50px
  background-color: #fff
  position: absolute
  top: 0
  left: 50px
  z-index: 1
  text-align: center
  transition: all ease 0.25s
  &.is-hidden
    opacity: 0
    visibility: hidden
</style>
