<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as axios from '@/axios'
import * as dto from '@/dto'
import { useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'
import { useCookies } from 'vue3-cookies'

let email = ref('')
let password = ref('')
const router = useRouter()
const { notify } = useNotification()
const $cookies = useCookies().cookies

type responseType = {
  statusCode: number,
  message: string,
  token?: string,
  user?: dto.userDto,
}

function login() {
  axios.login(email.value, password.value).then((response: responseType | undefined) => {
    if (response?.statusCode == 200) {
      notify({ text: response.message })
      router.push('/user/')
    } else {
      notify({
        text: 'Error: ' + response?.message,
        type: 'warn',
      })
    }
  }).catch((error) => {
    notify({
      text: 'Login failed: ' + error.message,
      type: 'error',
    })
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
      button(@click.prevent="login()") Send
      router-link.link(to="/user/register/") I have no account
</template>

<style lang="sass">
@import "/src/sass/user-login"
</style>