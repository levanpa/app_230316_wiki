<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import * as axios from '@/axios'
import * as dto from '@/dto'
import { useRoute, useRouter } from 'vue-router'
import { useDefaultStore } from '@/stores/default'

let email = ref('')
let password = ref('')
const router = useRouter()
let defaultStore = useDefaultStore()

// axios.ins.get('http://localhost:3030/api/carrers/c7e88f1f-76a1-421f-ac19-23242d7f0290').then((res) => {
//   console.log('2', res.data)
// }).catch((err) => {
//   console.log('2', err.message)
// })

function login(event: Event) {
  event.preventDefault()
  axios.login('lezinkmgt@gmail.com', '0000').then((res) => {
    // router.push('/user/')
    console.log('error', res)
  })
}
</script>

<template lang="pug">
.user-login-component
  .login-wrapper
    h2.login-title LOGIN INFORMATION
    .inputs
      label.input-wrapper(for="email-input")
        input.email-input#email-input(type="text" v-model="email" placeholder="email")
      label.input-wrapper(for="password-input")
        input.password-input#password-input(type="password1" v-model="password" placeholder="password")
    .button-wrapper
      button(@click="login($event)") Send
      router-link.link(to="/user/register/") I have no account
</template>

<style lang="sass">
@import "/src/sass/user-login"
</style>