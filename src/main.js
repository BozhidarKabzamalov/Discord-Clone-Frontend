import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import io from 'socket.io-client'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: 'Bozhidar',
        socket: null,
        servers: null,
        selectedServer: 0,
        selectedServerRoom: 0,
        emoji: null
    },
    mutations: {
        servers(state, servers){
            state.servers = servers
        },
        socket(state, socket){
            state.socket = socket
        },
        selectedServer(state, selectedServer){
            state.selectedServer = selectedServer
        },
        selectedServerRoom(state, selectedServerRoom){
            state.selectedRoom = selectedServerRoom
        },
        addServer(state, server){
            state.servers.push(server)
        },
        emoji(state, emoji){
            state.emoji = emoji
        }
    },
    actions: {
        getServers({commit}){
            return axios.get("http://localhost:3000/servers")
            .then((response) => {
                commit('servers', response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getEmoji({commit}){
            return axios.get("http://localhost:3000/emoji")
            .then((response) => {
                commit('emoji', response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        },
    }
})

new Vue({
    router,
    render: h => h(App),
    store: store
}).$mount('#app')
