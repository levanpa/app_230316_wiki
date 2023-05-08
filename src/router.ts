import * as VueRouter from 'vue-router'
import Home from './Home.vue'
import Detail from './Detail.vue'
import User from './User.vue'
import UserNew from './components/user/UserNew.vue'
import UserDefault from './components/user/UserDefault.vue'
import UserReviews from './components/user/UserReviews.vue'
import UserVotes from './components/user/UserVotes.vue'
import Admin from './Admin.vue'
import AdminDefault from './components/admin/AdminDefault.vue'
import AdminRequests from './components/admin/AdminRequests.vue'
import AdminReports from './components/admin/AdminReports.vue'

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
  {
    path: '/user/',
    component: User,
    children: [
      {
        path: '',
        component: UserDefault,
        meta: { title: 'user page' }
      },
      {
        path: 'reviews',
        component: UserReviews,
        meta: {
          breadcrumb: 'My reviews',
          title: 'My reviews'
        }
      },
      {
        path: 'votes',
        component: UserVotes,
        meta: {
          breadcrumb: 'My votes',
          title: 'My votes'
        }
      },
      {
        path: 'new',
        component: UserNew,
        meta: {
          breadcrumb: 'New review',
          title: 'New review'
        }
      },
    ],
  },
  {
    path: '/admin/',
    component: Admin,
    children: [
      {
        path: '',
        component: AdminDefault,
        meta: { title: 'admin dashboard' }
      },
      {
        path: 'requests',
        component: AdminRequests,
        meta: {
          breadcrumb: 'User requests',
          title: 'user requests'
        }
      },
      {
        path: 'reports',
        component: AdminReports,
        meta: {
          breadcrumb: 'User reports',
          title: 'user reports'
        }
      },
    ]
  }
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
    document.title = `Jobs review - ${to.meta.title}`
  }
})

export default router