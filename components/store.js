import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, JSESSIONID) {
      console.log('increment:'+ JSESSIONID);
      state.count = JSESSIONID;
    }
  }
})

export default store;