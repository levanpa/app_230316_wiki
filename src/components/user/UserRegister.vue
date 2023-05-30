<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import * as axios from '@/axios'
import * as dto from '@/dto'

let name = ref('')
let email = ref('')
let password = ref('')
let repassword = ref('')

// todo: login after register
function register(event: Event) {
  event.preventDefault()
  if (password.value !== repassword.value) {
    // todo: notify the error
    return
  }

  axios.register(name.value, email.value, password.value).then((response) => {
    axios.login(email.value, password.value)
  }).catch((error) => {
    console.log('error', error.message)
  })
}
</script>

<template lang="pug">
.user-login-component
  .login-wrapper
    h2.login-title REGISTER INFORMATION
    .inputs
      label.input-wrapper(for="name-input")
        input.name-input#name-input(type="text" v-model="name" placeholder="your name")
      label.input-wrapper(for="email-input")
        input.email-input#email-input(type="text" v-model="email" placeholder="email")
      label.input-wrapper(for="password-input")
        input.password-input#password-input(type="password" v-model="password" placeholder="password")
      label.input-wrapper(for="repassword-input")
        input.repassword-input#repassword-input(type="password" v-model="repassword" placeholder="password again")
    .button-wrapper
      button(@click="register($event)") Register
      router-link.link(to="/user/login/") Return to login
</template>

<style lang="sass">
@import "/src/sass/user-login"
</style>