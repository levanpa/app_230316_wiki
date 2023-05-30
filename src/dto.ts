export interface userDto {
  id?: number,
  name: string,
  email: string,
  is_admin: boolean,
  review_counter: number,
  vote_counter: number,
  created?: number,
}
export interface jobDto {
  id?: number,
  name: string,
  user_id?: number,
  img: string,
  review_counter: number,
  category: number,
  created?: number,
  is_public?: boolean
}
export interface reviewDto {
  id?: number,
  user_id?: number,
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
export interface categoryDto {
  id?: number,
  name: string,
  job_counter: number,
  created?: number,
}
export interface reportDto {
  id?: number,
  user_id: number,
  job_id: number,
  review_id: number,
  content: string,
  created?: number
}
export interface commonListInterface {
  name: string,
  text: string,
  job: string,
  url: string,
  content?: string,
  created?: number,
}
export interface anyObj {
  [key: string]: any
}
export type userTypes = 'guest' | 'user' | 'admin'