import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import io from 'socket.io-client'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null,
        username: null,
        userId: null,
        socket: null,
        servers: [],
        selectedServer: null,
        selectedServerRoom: null,
        emoji: []
    },
    mutations: {
        socket(state, socket){
            state.socket = socket
        },
        setServers(state, servers){
            state.servers = servers
        },
        addServer(state, server){
            state.servers.push(server)
        },
        removeServer(state, server){
            let index = state.servers.indexOf(server)
            state.servers.splice(index, 1)
        },
        selectedServer(state, selectedServer){
            state.selectedServer = selectedServer
        },
        selectedServerRoom(state, selectedServerRoom){
            state.selectedServerRoom = selectedServerRoom
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
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
        }
    },
    actions: {
        joinServer({commit, dispatch, state}, server){
            if (state.selectedServer != server.index) {
                if (state.socket) {
                    state.socket.close()
                }
                commit('selectedServer', server.index)
                commit('selectedServerRoom', null)
                commit('socket', io('http://localhost:3000' + server.server.endpoint))
                dispatch('joinRoom', {
                    serverId: server.server.id,
                    room: server.server.rooms[0],
                    index: 0
                })
            }
        },
        joinRoom({commit, state}, room){
            if (state.selectedServerRoom != room.index) {
                commit('selectedServerRoom', room.index)
                state.socket.emit('joinRoom', {
                    roomName: room.room.name,
                    serverId: room.serverId
                })
            }
        },
        async getUserServers({commit, state, dispatch}, userId){
            try {
                let response = await axios.get("/servers/" + userId)
                commit('setServers', response.data.servers)
                if (response.data.servers.length) {
                    dispatch('joinServer', {
                        server: state.servers[0],
                        index: 0
                    })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getEmoji({commit}){
            try {
                let response = await axios.get("/emoji")
                commit('emoji', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        autoLogin({commit, dispatch}){
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
            router.replace('/login')
        }
    }
})

export default store
