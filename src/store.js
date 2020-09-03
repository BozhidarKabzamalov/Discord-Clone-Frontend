import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import io from 'socket.io-client'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: null,
        userId: null,
        token: null,
        socket: null,
        servers: [],
        friends: [],
        selectedServer: null,
        selectedServerRoom: 0
    },
    mutations: {
        setSocket(state, socket){
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
        setSelectedServer(state, selectedServer){
            let index = state.servers.indexOf(selectedServer)
            state.selectedServer = index
        },
        setSelectedServerRoom(state, selectedServerRoom){
            state.selectedServerRoom = selectedServerRoom
        },
        setFriends(state, friends){
            state.friends = friends
        },
        setUser(state, userData){
            state.token = userData.token
            state.userId = userData.userId
            state.username = userData.username
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            localStorage.setItem('username', userData.username);
        },
        removeUser(state){
            state.token = null;
            state.userId = null;
            state.username = null;
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
        }
    },
    actions: {
        async getUserServers({commit, state}, userId){
            try {
                let response = await axios.get("/servers/" + userId)
                let servers = response.data.servers
                let friends = response.data.friends

                servers.forEach((server) => {
                    server.onlineUsers = []
                });

                commit('setServers', servers)
                commit('setFriends', friends)
            } catch (error) {
                console.log(error)
            }
        },
        joinServer({commit, dispatch, state}, server){
            if (state.socket) {
                state.socket.close()
            }
            if (server) {
                commit('setSocket', io('http://localhost:3000' + server.endpoint))
                dispatch('joinRoom', {
                    serverId: server.id,
                    room: server.rooms[0],
                    index: 0
                })

                state.socket.emit('userCameOnline', state.username)

                state.socket.on('messageToClient', (message) => {
                    server.rooms[state.selectedServerRoom].messages.push(message)
                })

                state.socket.on('chatHistory', (chatHistory) => {
                    server.rooms[state.selectedServerRoom].messages = chatHistory
                })

                state.socket.on('onlineUsers', (onlineUsers) => {
                    server.onlineUsers = onlineUsers
                })

            }
        },
        joinRoom({commit, state}, room){
            commit('setSelectedServerRoom', room.index)
            state.socket.emit('joinRoom', {
                roomName: room.room.name,
                serverId: room.serverId
            })
        },
        autoLogin({commit, dispatch}){
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const username = localStorage.getItem('username')
            if (!token) {
                return
            }
            commit('setUser', {
                token: token,
                userId: userId,
                username: username
            })
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + token

                return config
            });
            dispatch('getUserServers', userId)
        },
        logout({commit}){
            commit('removeUser')
            router.replace('/login')
        }
    }
})

export default store
