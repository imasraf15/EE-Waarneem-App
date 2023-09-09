import Vue from 'vue'
import Vuex from 'vuex'
import shifts from './modules/shifts'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: { shifts },
  })

export default store
