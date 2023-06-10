import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { useReviewsStore } from '@/stores/reviews'
import { useReportsStore } from '@/stores/reports'
import { useUsersStore } from '@/stores/users'
import { useDefaultStore } from '@/stores/default'
import * as dto from '@/dto'

const ins = axios.create({
  headers: {
    'secret': 'frontend'
  }
})
type dtos = dto.jobDto | dto.reviewDto | dto.reportDto | dto.userDto
let store: any

// nestjs api
// const BEapi = 'http://localhost:3030/api/'
// json-server api
const BEapi = 'http://localhost:3000/'

function getStoreFromType(type: string) {
  store = undefined
  switch (type) {
    case 'jobs':
      store = useJobsStore()
      break
    case 'reviews':
      store = useReviewsStore()
      break
    case 'reports':
      store = useReportsStore()
      break
    case 'users':
      store = useUsersStore()
      break
    default:
      console.log('store type not found')
  }
}

async function fetchOne(type: string, id: number): Promise<dtos | undefined> {
  if (!id) {
    console.log('id 0 not found')
    return
  }
  getStoreFromType(type)
  if (!store) return

  let result: dtos = {
    id: 0,
    name: '',
    img: '',
    review_counter: 0,
    category: 0,
  }
  let temp: dtos | undefined = store.get(id)

  if (temp) {
    console.log(`fetched ${type} from store`)
    return temp
  }

  await ins.get(`${BEapi + type}/${id}`).then((response) => {
    store.add([response.data])
    result = response.data
  })

  return result
}

async function fetchAll(type: string, options: dto.anyObj = {}): Promise<dtos[] | undefined> {
  getStoreFromType(type)
  if (!store) return

  let result: dtos[] = [{
    id: 0,
    name: '',
    img: '',
    review_counter: 0,
    category: 0,
  }]

  const suffix = '?_limit=5'

  await ins.get(`${BEapi + type + suffix}`, options).then((response) => {
    if (Array.isArray(response.data)) {
      store.add(response.data)
    } else {
      store.add([response.data])
    }
    result = response.data
  })

  return result
}

async function login(email: string, password: string) {
  let returnData
  let isError = false
  let defaultStore = useDefaultStore()

  await ins.post(`${BEapi}auth/login`, { email, password }).then((response) => {
    defaultStore.setAccessToken(response.data.accessToken)
    defaultStore.setRefreshToken(response.data.refreshToken)
    returnData = response.data
  }).catch((error) => {
    isError = true
    returnData = error
  })

  // todo: fetch user data
  if (!isError) {
    defaultStore.setUserType('user')
    defaultStore.setUser({
      id: 1,
      name: 'test',
      email: 'testmail@test.com',
      is_admin: true,
      review_counter: 24,
      vote_counter: 134,
    })
    // await fetchAll('users', { email: email }).then((response) => {
    //   console.log('users response', response)
    // }).catch((error) => {
    //   console.log('error response', error.message)
    // })
  }

  return returnData
}

async function register(name: string, email: string, password: string) {
  return await ins.post(`${BEapi}auth/register`, { name, email, password })
}

export { ins, fetchOne, fetchAll, login, register }