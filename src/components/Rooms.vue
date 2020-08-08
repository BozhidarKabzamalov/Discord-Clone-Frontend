<template lang="html">
    <div class="rooms" v-if='servers'>

        <div class="selected-server">
            <p class='selected-server-name'>{{ servers[selectedServer].name }}</p>
            <ServerSettings></ServerSettings>
        </div>

        <div class="text-channels-container">
            <h2 class='text-channels'>Rooms</h2>
            <CreateRoom></CreateRoom>
        </div>

        <div :class="[{'active': index == selectedServerRoom}, 'room']" v-for='(room, index) in servers[selectedServer].rooms' @click='joinRoom(room, index)'>
            <i class="hashtag fas fa-hashtag"></i>
            <p>{{ room.name }}</p>
        </div>

    </div>
</template>

<script>
import CreateRoom from './CreateRoom'
import ServerSettings from './ServerSettings'
import axios from 'axios'

export default {
    components: {
        CreateRoom,
        ServerSettings
    },
    methods: {
        joinRoom(room, index){
            this.$store.dispatch('joinRoom', {
                room: room,
                index: index,
                serverId: this.servers[this.selectedServer].id
            })
        },
        deleteRoom(room, index){
            axios.post('/deleteRoom', room)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        servers(){
            return this.$store.state.servers
        },
        selectedServer(){
            return this.$store.state.selectedServer
        },
        selectedServerRoom(){
            return this.$store.state.selectedServerRoom
        },
        userId(){
            return this.$store.state.userId
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-transform: uppercase;
    padding: 0px 20px;
    color: #8e9297;
    font-size: 11px;
    font-weight: 700;
}
.room {
    font-weight: 700;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 10px 20px;
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
.room:hover .delete-room {
    display: block;
    background-color: #34373c;
}
.selected-server {
    display: flex;
    padding: 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}
.selected-server-name {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
}
.hashtag {
    margin-right: 5px;
}
</style>
