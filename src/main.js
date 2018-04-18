// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MyWebConstants from '../static/MyWebConstants'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Qs from 'qs'

Vue.use(Qs);
Vue.prototype.Qs = Qs;

Vue.prototype.$axios = axios

//axios.defaults.baseURL = '/api'

Vue.use(MyWebConstants)
Vue.use(ElementUI)

Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
axios.interceptors.response.use(
    response => {
    	if(response.headers.token){
    		localStorage.token = response.headers.token
    	};
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

axios.interceptors.request.use(
config => {
    // 这里写死一个token，你需要在这里取到你设置好的token的值
        // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
    config.headers.token = localStorage.token;
    return config
},
error => {
    return Promise.reject(error)
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
