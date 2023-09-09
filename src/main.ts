import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import VueCookies from 'vue3-cookies'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Notifications)
app.use(VueCookies, { expireTimes: '7d' })
app.mount('#app')
