import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const isProd = (process.env.NODE_ENV === 'product' || process.env.NODE_ENV === 'production')
const isStage = process.env.NODE_ENV === 'stage'

import '../common/dateUtils.js'

const RedPacket = (process.env.VUE_ENV == 'client') ? (resolve => {
  require.ensure(['../views/redPacket/redPacket.vue'], () => {
    resolve(require('../views/redPacket/redPacket.vue'))
  })
}) : require('../views/redPacket/redPacket.vue')

let base = '/'
if (isProd || isStage) {
  base = '/'
}

let router = new Router({
  mode: 'history',
  base: base,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: RedPacket, name: 'redPacket' },
  ]
})
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  
})
export default router
