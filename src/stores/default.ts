import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '@/dto'
import { ins } from '@/axios'

export const useDefaultStore = defineStore('default', () => {
  // current user logged in
  let user: dto.userDto = {
    id: 0,
    name: '',
    email: '',
    role: 0,
    review_counter: 0,
    vote_counter: 0,
  }
  let accessToken = ''
  let refreshToken = ''

  let userType: dto.userTypes = 'guest'

  function setUser(newUser: dto.userDto) {
    user = { ...newUser }
  }

  function getUser(): dto.userDto {
    return user
  }

  function getAccessToken() {
    return accessToken
  }

  function setAccessToken(token: string) {
    accessToken = token
  }

  function getRefreshToken() {
    return accessToken
  }

  function setRefreshToken(token: string) {
    refreshToken = token
  }

  function getUserType() {
    return userType
  }

  function setUserType(type: dto.userTypes) {
    userType = type
  }

  function logout() {
    user = {
      id: 0,
      name: '',
      email: '',
      role: 0,
      review_counter: 0,
      vote_counter: 0,
    }
    accessToken = ''
    refreshToken = ''
    userType = 'guest'
  }

  return {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
    setUser,
    getUser,
    getUserType,
    setUserType,
    logout,
  }
})
