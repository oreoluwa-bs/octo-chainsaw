import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import SearchView from './views/SearchView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
