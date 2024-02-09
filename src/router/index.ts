import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const Lottery = () => import('@/views/lottery/lottery.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/buptreasure',
    component: Lottery
  },
  {
    path: '/buptreasure',
    name: 'Lottery',
    component: Lottery
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
