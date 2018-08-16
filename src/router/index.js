import Vue from 'vue'
import Router from 'vue-router'
import Episodes from '@/components/Episodes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Episodes',
      component: Episodes
    }
  ]
})
