import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const Lottery = () => import('@/views/lottery/lottery.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/dist/',
    name: 'ProductHome',
    redirect: '/lottery',
    component: Lottery
  },
  {
    path: '/dist/lottery',
    name: 'ProductLottery',
    component: Lottery
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/lottery',
    component: Lottery
  },
  {
    path: "/lottery",
    name: "lottery",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Lottery
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
