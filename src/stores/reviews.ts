import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as dto from '../dto'

export const useReviewsStore = defineStore('reviews', () => {
  let reviews: Ref<dto.reviewDto[]> = ref([])

  function add(inputReviews: dto.reviewDto[]) {
    inputReviews.map(review => {
      if (!reviews.value.includes(review)) {
        reviews.value.push({ ...review })
      }
    })
  }

  function get(id: number): dto.reviewDto | undefined {
    return reviews.value.filter(review => review.id === id)[0]
  }

  return { reviews, add, get }
})