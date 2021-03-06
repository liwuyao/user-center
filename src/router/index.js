import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home/home.vue'
//页面引用
import Index from '@/components/page/page-application.vue'
import User from '@/components/page/page-user.vue'
import productList from '@/components/page/page-product-list.vue'
import productCategory from '@/components/page/page-product-category.vue'
import orderList from '@/components/page/page-order-list.vue'
import merchantList from '@/components/page/page-merchant-list.vue'
import attributeList from '@/components/page/page-category-attribute.vue'

import applicationMessage from '@/components/from/application-message.vue'
import userMessage from '@/components/from/user-message.vue'
import userMessageModify from '@/components/from/user-message-modify.vue'
import merchantMessage from '@/components/from/merchant-message.vue'

import lookUpClinet from '@/components/look-up/look-up-client-message.vue'
import lookUpUser from '@/components/look-up/look-up-user-message.vue'
import lookUpMerchant from '@/components/look-up/look-up-merchant-message.vue'
import lookUpOrderReplace from '@/components/look-up/look-up-order-replace-message.vue'
import lookUpPruductDetail from '@/components/look-up/look-up-product-detail.vue'

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
      path: '/lookClient',
      component: lookUpClinet
    },
    {
      path: '/user/:id',
      component: userMessage
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
      path: '/merchant/:id',
      component: merchantMessage
    },
    {
      path: '/lookMerchant',
      component: lookUpMerchant
    },
    {
      path: '/lookOrderReplace',
      component: lookUpOrderReplace
    },
    {
      path: '/lookProductDetail',
      component: lookUpPruductDetail
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
        },
        {
          path: '/orderList',
          component: orderList
        },
        {
          path: '/merchantList',
          component: merchantList
        },
        {
          path: '/attributeList',
          component: attributeList
        }
      ]
    }
  ]
})
