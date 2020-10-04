import router from '../router'
import axios from 'axios'
import io from 'socket.io-client'

const server = {
    state: {
        socket: null,
        servers: [],
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
        }
    },
    actions: {
        async getUserServers({commit, state}, userId){
            try {
                let response = await axios.get("/servers/" + userId)

                let servers = response.data.servers

                servers.forEach((server) => {
                    server.onlineUsers = []
                });

                commit('setServers', servers)
            } catch (error) {
                console.log(error)
            }
        },
        joinServer({commit, dispatch, state, rootState}, server){
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

                state.socket.emit('userCameOnline', rootState.authentication.user.username)

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
        }
    }
}

export default server
