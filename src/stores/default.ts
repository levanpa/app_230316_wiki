import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '@/dto'
import { ins } from '@/axios'

export const useDefaultStore = defineStore(
  'default',
  () => {
    // current user logged in
    let user = ref<dto.userDto>({
      id: 0,
      name: '',
      email: '',
      role: 0,
      review_counter: 0,
      vote_counter: 0,
    })
    let userType = ref<dto.userTypes>('guest')

    function logout() {
      console.log('logout')
      user.value = {
        id: 0,
        name: '',
        email: '',
        role: 0,
        review_counter: 0,
        vote_counter: 0,
      }
      userType.value = 'guest'
    }

    return {
      user,
      userType,
      logout,
    }
  },
  {
    persist: true,
  },
)
