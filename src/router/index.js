import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home/home.vue'
import Index from '@/components/page/page-application.vue'
import User from '@/components/page/page-user.vue'
import productList from '@/components/page/page-product-list.vue'
import productCategory from '@/components/page/page-product-category.vue'
import applicationMessage from '@/components/from/application-message.vue'
import userMessage from '@/components/from/user-message.vue'
import userMessageModify from '@/components/from/user-message-modify.vue'
import lookUpClinet from '@/components/look-up/look-up-client-message.vue'
import lookUpUser from '@/components/look-up/look-up-user-message.vue'
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
      path: '/client/:id',
      component: applicationMessage
    },
    {
      path: '/user/:id',
      component: userMessage
    },
    {
      path: '/lookClient',
      component: lookUpClinet
    },
    {
      path: '/lookUser',
      component: lookUpUser
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
        },
        {
          path: '/productList',
          component: productList
        },
        {
          path: '/productCategory',
          component: productCategory
        }
      ]
    }
  ]
})
