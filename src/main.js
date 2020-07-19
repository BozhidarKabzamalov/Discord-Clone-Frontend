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
        token: null,
        username: null,
        userId: null,
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
        },
        authUser(state, userData){
            state.token = userData.token
            state.userId = userData.userId
            state.username = userData.username
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            localStorage.setItem('username', userData.username);
        },
        clearAuthUser(state){
            state.token = null;
            state.userId = null;
            state.username = null;
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
        register({commit}, data){
            axios.post('http://localhost:3000/register', {
                username: data.username,
                password: data.password,
                email: data.email
            })
            .then(response => {
                commit('authUser', {
                    token: response.data.token,
                    userId: response.data.userId,
                    username: response.data.username
                })
                router.replace('/')
            });
        },
        login({commit}, userInfo){
            axios.post('http://localhost:3000/login', userInfo)
            .then(response => {
                commit('authUser', {
                    token: response.data.token,
                    userId: response.data.userId,
                    username: response.data.username
                })
                router.replace('/')
            }).catch((error) => console.log(error));
        },
        autoLogin({commit}, data){
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const username = localStorage.getItem('username')
            if (!token) {
                return
            }
            commit('authUser', {
                token: token,
                userId: userId,
                username: username
            })
        },
        logout({commit}){
            commit('clearAuthUser')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
            router.replace('/login')
        }
    },
    getters: {
        isAuthenticated(state){
            return state.token !== null
        }
    }
})

new Vue({
    router,
    render: h => h(App),
    store: store
}).$mount('#app')
