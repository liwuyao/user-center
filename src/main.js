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

Vue.prototype.$axios = axios;

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
    	if(response.data.state == '000010'){
//  		var _http = window.location.pathname+'/#/login'
//  		window.location.href = _http;
			 router.push('login')
    	}
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
//拦截请求
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
//formate
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
