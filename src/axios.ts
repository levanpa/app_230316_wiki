import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { useReviewsStore } from '@/stores/reviews'
import { useReportsStore } from '@/stores/reports'
import { useUsersStore } from '@/stores/users'
import * as dto from '@/dto'

const ins = axios.create({
  headers: {
    'secret': 'backend'
  }
})
type dtos = dto.jobDto | dto.reviewDto | dto.reportDto | dto.userDto
let store: any

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
  await ins.get(`http://localhost:3000/${type}/${id}`).then((response) => {
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
  let suffix = ''

  if (options) {
    suffix += '?'
    for (const [key, value] of Object.entries(options)) {
      suffix += `${key}=${value}&`
    }
  }

  await ins.get(`http://localhost:3000/${type + suffix}`).then((response) => {
    if (Array.isArray(response.data)) {
      store.add(response.data)
    } else {
      store.add([response.data])
    }
    result = response.data
  })

  return result
}

async function fetchData(type: string): Promise<dto.anyObj[]> {
  let result: dto.anyObj = {
    id: 0,
    name: '',
    img: '',
    review_counter: 0,
    category: 0,
  }

  return [result]
}

export { ins, fetchOne, fetchAll, fetchData }