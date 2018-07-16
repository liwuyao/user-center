import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './module.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientKeyIndex: 0,
    queryClientKey:''
  },
  mutations: {
    changeClientKey(state,key) {
      state.queryClientKey = key;
    }
  },
  modules: {
    a: moduleA,
  }
})
