import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '@/dto'
import { ins } from '@/axios'

export const useJobsStore = defineStore('jobs', () => {
  let jobs: Ref<dto.jobDto[]> = ref([])

  function add(inputJobs: dto.jobDto[]) {
    inputJobs.map(job => {
      if (!jobs.value.includes(job)) {
        jobs.value.push({ ...job })
      }
    })
  }

  function get(id: number = 0): dto.jobDto | undefined {
    if (!id) return
    return jobs.value.filter(job => job.id === id)[0]
  }

  return { jobs, add, get }
})