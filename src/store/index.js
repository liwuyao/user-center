import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './module.js'


Vue.use(Vuex)

//const state = {
//currentThreadID: null,
//threads: {
//  /*
//  id: {
//    id,
//    name,
//    messages: [...ids],
//    lastMessage
//  }
//  */
//},
//messages: {
//  /*
//  id: {
//    id,
//    threadId,
//    threadName,
//    authorName,
//    text,
//    timestamp,
//    isRead
//  }
//  */
//}
//}

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state,n) {
      state.count + n
    }
  },
  modules: {
    a: moduleA,
  }
})
