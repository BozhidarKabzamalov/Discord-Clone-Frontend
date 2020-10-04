import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import server from './server'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        authentication,
        server
    }
})

export default store
