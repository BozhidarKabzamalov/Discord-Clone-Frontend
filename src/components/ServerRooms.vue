<template lang="html">
    <div class="rooms">
        <div class="server">
            <p class='server-name'>{{ server.name }}</p>
            <ServerSettings v-if='userId == server.userId' :server='server'></ServerSettings>
        </div>
        <div class="text-channels-container">
            <h2 class='text-channels'>Rooms</h2>
            <ServerRoomsCreate v-if='userId == server.userId' :server='server'></ServerRoomsCreate>
        </div>
        <div :class="[{'active': index == selectedServerRoom}, 'room']" v-for='(room, index) in server.rooms'>
            <div class="room-name-container" @click='joinRoom(room, index)'>
                <i class="hashtag fas fa-hashtag"></i>
                <p>{{ room.name }}</p>
            </div>
            <i class="delete-room fas fa-times" @click='deleteRoom(room, index)'></i>
        </div>
    </div>
</template>

<script>
import ServerRoomsCreate from './ServerRoomsCreate'
import ServerSettings from './ServerSettings'
import axios from 'axios'

export default {
    props: [
        'server'
    ],
    components: {
        ServerRoomsCreate,
        ServerSettings
    },
    methods: {
        joinRoom(room, index){
            this.$store.dispatch('joinRoom', {
                room: room,
                index: index,
                serverId: this.server.id
            })
        },
        async deleteRoom(room, index){
            try {
                let response = await axios.post('/deleteRoom', room)
                this.$store.commit('setSelectedServerRoom', 0)
                this.server.rooms.splice(index, 1)
            } catch (error) {
                console.log(error)
            }
        }
    },
    computed: {
        userId(){
            return this.$store.state.userId
        },
        selectedServerRoom(){
            return this.$store.state.selectedServerRoom
        }
    }
}
</script>

<style lang="css" scoped>
.rooms {
    width: 240px;
    background-color: #2f3136;
}
.text-channels-container {
    display: flex;
    align-items: center;
    padding: 20px 0;
}
.text-channels {
    display: flex;
    justify-content: center;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-transform: uppercase;
    padding: 0px 20px;
    color: #8e9297;
    font-size: 11px;
    font-weight: 700;
    height: 19px;
    margin-right: auto;
}
.room {
    font-weight: 700;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #72767d;
    cursor: pointer;
    user-select: none;
}
.active {
    cursor: auto;
    color: rgba(255, 255, 255, 0.8);
    background-color: #34373c;
}
.room:hover {
    color: rgba(255, 255, 255, 0.8);
    background-color: #34373c;
}
.delete-room {
    display: none;
    cursor: pointer;
    margin-right: 20px;
}
.room:hover .delete-room {
    display: block;
    background-color: #34373c;
}
.server {
    display: flex;
    padding: 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}
.server-name {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    margin-right: auto;
}
.hashtag {
    margin-right: 5px;
}
.room-name-container {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 10px 20px;
}
</style>
