import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '../dto'

export const useUsersStore = defineStore('users', () => {
  let users: Ref<dto.userDto[]> = ref([])

  function add(inputUser: dto.userDto[]) {
    inputUser.map(user => {
      if (!users.value.includes(user)) {
        users.value.push({ ...user })
      }
    })
  }

  function get(id: number = 0): dto.userDto | undefined {
    if (!id) return
    return users.value.filter(user => user.id === id)[0]
  }

  return { users, add, get }
})