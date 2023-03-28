import * as VueRouter from 'vue-router'
import Home from './Home.vue'
import Detail from './Detail.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { title: 'home page' }
  },
  {
    path: '/detail/:id',
    component: Detail,
    meta: { title: 'detail page' }
  },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  setTimeout(() => next(), 50)
})
router.afterEach((to, from, failure) => {
  if (!failure) {
    const titleElement = document.getElementsByTagName('title')[0]
    titleElement.textContent = `Jobs review - ${to.meta.title}`
  }
})

export default router