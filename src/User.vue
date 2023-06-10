<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as axios from '@/axios'
import * as dto from '@/dto'
import { useNotification } from '@kyvg/vue3-notification'
import { useDefaultStore } from '@/stores/default'

const route = useRoute()
const router = useRouter()
let breadcrumb = route.meta.breadcrumb ? ref((route.meta.breadcrumb).toString()) : ref('')
let isShowRules = route.path == '/user/new' ? ref(true) : ref(false)
const { notify } = useNotification()
let nameInput = ref('Nguyen Thi Bich Chi')
let emailInput = ref('lezinkkatory@gmail.com')
let prevName = nameInput.value
let prevEmail = emailInput.value
let defaultStore = useDefaultStore()
let currentUser: dto.userDto

onMounted(() => {
  checkUserType()
})

// todo: put request to save profile
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

// check if current user is guest or regular user or admin
function checkUserType() {
  const userType = defaultStore.getUserType()
  console.log('userType', userType)
  switch (userType) {
    case 'user':
      currentUser = defaultStore.getUser()
      nameInput.value = currentUser.name
      emailInput.value = currentUser.email
    case 'admin':
      // router.push('/admin/')
      break
    default:
      // router.push('/user/login/')
      break
  }
}

watch(() => route.meta, newMeta => {
  breadcrumb.value = newMeta.breadcrumb ? (newMeta.breadcrumb).toString() : ''
})

watch(() => route.path, newPath => {
  checkUserType()
  isShowRules.value = newPath == '/user/new' ? true : false
})

</script>

<template lang="pug">
.user-component
  .layout-wrapper
    .sidebar-wrapper(v-if="defaultStore.getUserType()!='guest'")
      .profile-wrapper
        .profile-title PROFILE INFORMATIONS
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
          span {{ currentUser && currentUser.review_counter }}
        .profile-item
          span.item-title Vote counter:
          span {{ currentUser && currentUser.vote_counter }}
      button.save-button(@click="$event=>saveProfile($event)") Save profile
      router-link.request-button(to="/user/new") Review for new job
      .rules(v-if="isShowRules")
        .rule-wrapper
          h3.rule-title Rules and recommendations
          p.rule-content Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis neque, eius praesentium cumque veniam repudiandae, consectetur doloremque placeat earum, ducimus sunt dignissimos sapiente distinctio ipsa incidunt sequi aperiam tempora tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime minus earum odit, obcaecati delectus repellendus suscipit eius, mollitia soluta atque laudantium officiis eaque eligendi. Est nemo hic odio dignissimos repellendus!
    .sidebar-wrapper(v-else)
      p You need to login first

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