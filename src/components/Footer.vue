<script setup lang="ts"></script>

<template lang="pug">
footer.footer-component
  .layout-wrapper
    p This is footer
</template>

<style lang="sass">
// @import "/src/sass/footer"
.footer-component
  padding: 15px 0
  color: #fff
  font-size: 18px
  background: linear-gradient(to right, #314268, #824949, #c3acf7)

+mb
  .footer-component
    padding: 15rem 0
    font-size: 18rem
</style>
