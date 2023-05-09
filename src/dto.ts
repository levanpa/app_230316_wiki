export type reviewDto = {
  id: number,
  name: string,
  content: string,
  like: number,
  dislike: number,
  job_id: string,
  created?: number,
  experience?: string,
  [key: string]: any
}
export type jobDto = {
  id?: string,
  job_id: string,
  name: string,
  img: string,
  review_counter: number,
  location: string,
  category: number,
  created?: number,
}
export type categoryDto = {
  id: number,
  name: string,
  job_counter: number,
  created?: number,
}