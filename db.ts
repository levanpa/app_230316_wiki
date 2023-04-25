import axios from 'axios'
import * as dto from './src/dto'
let log = console.log

const BACKEND_URL = 'http://localhost:3000/'

// async function dbRead(id) {
//   return await fetch(`${BACKEND_URL}tasks/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//     },
//   })
// }

export async function dbWrite(job: dto.jobDto) {
  return await axios.post(`${BACKEND_URL}jobs/`, job)
  // return await fetch(`${BACKEND_URL}jobs/`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  //   body: JSON.stringify(job)
  // })
}

// async function dbSubmitPassword(id, password) {
//   return await fetch(`${BACKEND_URL}tasks/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//     },
//     body: JSON.stringify({
//       type: 'submit-password',
//       id,
//       password
//     })
//   })
// }

// export { dbRead, dbWrite, dbSubmitPassword }