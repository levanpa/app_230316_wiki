export type reviewDto = {
  id?: number,
  name: string,
  content: string,
  location: string,
  like: number,
  dislike: number,
  job_id: number,
  created?: number,
  experience?: number,
  [key: string]: any
}
export type jobDto = {
  id?: number,
  name: string,
  img: string,
  review_counter: number,
  category: number,
  created?: number,
}
export type categoryDto = {
  id?: number,
  name: string,
  job_counter: number,
  created?: number,
}