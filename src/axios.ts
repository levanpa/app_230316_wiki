import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { useReviewsStore } from '@/stores/reviews'
import { useReportsStore } from '@/stores/reports'
import { useUsersStore } from '@/stores/users'
import { useDefaultStore } from '@/stores/default'
import * as dto from '@/dto'

const ins = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Credentials': true, // todo: what is this?
    secret: 'frontend',
  },
})
type dtos = dto.jobDto | dto.reviewDto | dto.reportDto | dto.userDto
const BEapi = 'http://localhost:3000/'
let store: any
// let store: Store<'jobs' | 'users' | 'reviews' | 'reports'> | undefined

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
      console.log(`store type: ${type} not found`)
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

async function fetchAll(
  type: string,
  options: dto.anyObj = {},
): Promise<dtos[] | undefined> {
  getStoreFromType(type)
  if (!store) return

  let result: dtos[] = [
    {
      id: 0,
      name: '',
      img: '',
      review_counter: 0,
      category: 0,
    },
  ]

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
  let defaultStore = useDefaultStore()

  await ins
    .post(`${BEapi}auth/login`, { email, password })
    .then((response) => {
      const data = response.data
      if (data.statusCode == 200) {
        // defaultStore.setRefreshToken(response.data.refreshToken)
        defaultStore.setAccessToken(data.token)
        defaultStore.setUserType('user') // todo: check user role
        defaultStore.setUser(data.user)
      }
      returnData = data
    })
    .catch(({ message, code }) => {
      returnData = { message, code }
    })

  return returnData
}

async function register(name: string, email: string, password: string) {
  return await ins.post(`${BEapi}auth/register`, { name, email, password })
}

export { ins, fetchOne, fetchAll, login, register }
