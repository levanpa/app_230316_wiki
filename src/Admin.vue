<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
let breadcrumb: Ref<string> =
  route.meta.breadcrumb ? ref((route.meta.breadcrumb).toString()) : ref('')

watch(() => route.meta, newMeta => {
  breadcrumb.value = newMeta.breadcrumb ? (newMeta.breadcrumb).toString() : ''
})

</script>

<template lang="pug">
.user-component
  .layout-wrapper
    .sidebar-wrapper
      .profile-wrapper
        h2.profile-title STATISTICS
        .profile-item
          span.item-title Total review counter:
          span.bold 205
        .profile-item
          span.item-title Total vote counter:
          span.bold 2505
        .profile-item
          span.item-title Total report counter:
          span.bold 135
      //- button.save-button(@click="$event=>saveProfile($event)") Save profile
      //- router-link.request-button(to="/user/new") Review for new job
    .main-content
      .breadcrumb-wrapper
        router-link.user-home(to="/admin")
          i.fa-solid.fa-house-user
          | Dashboard
        i.fa-solid.fa-angle-right(v-if="breadcrumb")
        span.current(v-if="breadcrumb") {{ breadcrumb }}
      router-view
</template>

<style lang="sass">
@import "/src/sass/user"
</style>