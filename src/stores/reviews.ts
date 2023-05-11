import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import * as dto from '../dto'

export const useReviewsStore = defineStore('reviews', () => {
  let reviews: Ref<dto.reviewDto[]> = ref([])

  function add(inputReviews: dto.reviewDto[]) {
    inputReviews.map(review => {
      if (!reviews.value.includes(review)) {
        reviews.value.push(review)
      }
    })
  }

  function get(jobId: number): dto.reviewDto[] | undefined {
    return reviews.value.filter(review => review.job_id === jobId)
  }

  return { reviews, add, get }
})