import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import VueCookies from 'vue3-cookies'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Notifications)
app.use(VueCookies, { expireTimes: '7d' })
app.mount('#app')
