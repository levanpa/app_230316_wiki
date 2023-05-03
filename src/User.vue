<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import axios from 'axios'
import * as dto from './dto'
import { useNotification } from '@kyvg/vue3-notification'

const route = useRoute()
let breadcrumb: Ref<string> =
  route.meta.breadcrumb ? ref((route.meta.breadcrumb).toString()) : ref('')
let isShowRules: Ref<boolean> = route.path == '/user/new' ? ref(true) : ref(false)
const { notify } = useNotification()
let nameInput: Ref<string> = ref('Nguyen Thi Bich Chi')
let emailInput: Ref<string> = ref('lezinkkatory@gmail.com')
let prevName: string = nameInput.value
let prevEmail: string = emailInput.value

watch(() => route.meta, newMeta => {
  breadcrumb.value = newMeta.breadcrumb ? (newMeta.breadcrumb).toString() : ''
})

watch(() => route.path, newPath => {
  isShowRules.value = newPath == '/user/new' ? true : false
})

function saveProfile(event: Event) {
  event.preventDefault()
  if (prevName === nameInput.value && prevEmail === emailInput.value) {
    notify({
      text: 'Profile was not edited.',
      type: 'warn'
    })
  } else {
    notify({
      text: 'Profile has been saved successfully!',
    })
    prevName = nameInput.value
    prevEmail = emailInput.value
  }
}
</script>

<template lang="pug">
.user-component
  .layout-wrapper
    .sidebar-wrapper
      .sidebar
        .profile-wrapper
          .profile-item
            span.item-title Name:
            input#name-input(placeholder="your name" v-model="nameInput")
            label(for="name-input")
              i.fa-regular.fa-pen-to-square
          .profile-item
            span.item-title Email:
            input#email-input(placeholder="your email" v-model="emailInput")
            label(for="email-input")
              i.fa-regular.fa-pen-to-square
          .profile-item
            span.item-title Review counter:
            span 25
          .profile-item
            span.item-title Vote counter:
            span 255
        button.save-button(@click="$event=>saveProfile($event)") Save profile
        router-link.request-button(to="/user/new") Review for new job
        .rules(v-if="isShowRules")
          .rule-wrapper
            h3.rule-title Rules and recommendations
            p.rule-content Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis neque, eius praesentium cumque veniam repudiandae, consectetur doloremque placeat earum, ducimus sunt dignissimos sapiente distinctio ipsa incidunt sequi aperiam tempora tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime minus earum odit, obcaecati delectus repellendus suscipit eius, mollitia soluta atque laudantium officiis eaque eligendi. Est nemo hic odio dignissimos repellendus!

    .main-content
      .breadcrumb-wrapper
        router-link.user-home(to="/user")
          i.fa-solid.fa-house-user
          | Dashboard
        i.fa-solid.fa-angle-right(v-if="breadcrumb")
        span.current(v-if="breadcrumb") {{ breadcrumb }}
      router-view
</template>

<style lang="sass">
@import "/src/sass/user"
</style>