import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '@/dto'
import { ins } from '@/axios'

export const useDefaultStore = defineStore('default', () => {
  // current user logged in
  let user: dto.userDto = {
    name: '',
    email: '',
    is_admin: false,
    review_counter: 0,
    vote_counter: 0,
  }
  let accessToken: string = ''
  let refreshToken: string = ''

  let userType: dto.userTypes = 'guest'

  function setUser(newUser: dto.userDto) {
    user = { ...newUser }
  }

  function getUser(): dto.userDto {
    return user
  }

  function setAccessToken(token: string) {
    accessToken = token
  }

  function getUserType() {
    return userType
  }

  function setUserType(type: dto.userTypes) {
    userType = type
  }

  function setRefreshToken(token: string) {
    refreshToken = token
  }

  return { accessToken, refreshToken, setAccessToken, setRefreshToken, setUser, getUser, getUserType, setUserType }
})