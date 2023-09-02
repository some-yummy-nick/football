import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import '@/styles/style.scss'
import App from '@/App.vue'
import {routes} from "@/routes";
import {store} from "@/store";
import Overlay from "@/components/Overlay.vue"

const router = createRouter({
    routes,
    history: createWebHistory()
})
const app = createApp(App)
app.use(router)
app.use(store)
app.component('Overlay', Overlay)
app.mount('#app')
