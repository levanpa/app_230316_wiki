export type reviewDto = {
  id: number,
  name: string,
  content: string,
  like: number,
  dislike: number,
  job_id: string,
  created: number
}
export type jobDto = {
  id: string,
  name: string,
  img: string,
  review_counter: number,
  location: string,
  category: string,
}