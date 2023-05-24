import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '../dto'

export const useReportsStore = defineStore('reports', () => {
  let reports: Ref<dto.reportDto[]> = ref([])

  function add(inputReports: dto.reportDto[]) {
    inputReports.map(report => {
      if (!reports.value.includes(report)) {
        reports.value.push({ ...report })
      }
    })
  }

  function get(id: number | null = null): dto.reportDto[] | undefined {
    if (id) {
      return reports.value.filter(report => report.id === id)
    } else {
      return reports.value
    }
  }

  return { reports, add, get }
})