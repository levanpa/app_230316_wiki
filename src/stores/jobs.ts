import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import * as dto from '../dto'

export const useJobsStore = defineStore('jobs', () => {
  let jobs: Ref<dto.jobDto[]> = ref([])

  function add(inputJobs: dto.jobDto[]) {
    inputJobs.map(job => {
      if (!jobs.value.includes(job)) {
        jobs.value.push(job)
      }
    })
  }

  function get(id: number | null = null): dto.jobDto[] | undefined {
    if (id) {
      return jobs.value.filter(job => job.id === id)
    } else {
      return jobs.value
    }
  }

  return { jobs, add, get }
})