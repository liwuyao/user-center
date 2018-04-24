import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Zhuce from '@/components/zhuce'
import Home from '@/components/home/home.vue'
import Index from '@/components/page/page-application.vue'
import User from '@/components/page/page-user.vue'
import applicationMessage from '@/components/from/application-message.vue'
import userMessage from '@/components/from/user-message.vue'
import userMessageModify from '@/components/from/user-message-modify.vue'
//import Silde from '@/components/home/slide-bar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/zhuce',
      component: Zhuce
    },
    {
      path: '/client/:id',
      component: applicationMessage
    },
    {
      path: '/user/:id',
      component: userMessage
    },
    {
      path: '/userModify',
      component: userMessageModify
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          component: Index
        },
        {
          path: '/usercenter',
          component: User
        }
      ]
    }
  ]
})
