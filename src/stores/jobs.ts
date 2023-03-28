import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import * as dto from '../dto'

export const useJobsStore = defineStore('jobs', () => {
  let jobs: Ref<dto.jobDto[]> = ref([])
  function add(inputJobs: dto.jobDto[]) {
    jobs.value.push(...inputJobs)
  }
  function get(id: string | null = null): dto.jobDto[] | undefined {
    if (id) {
      return jobs.value.filter(job => job.id === id)
    } else {
      return jobs.value
    }
  }
  return { jobs, add, get }
})