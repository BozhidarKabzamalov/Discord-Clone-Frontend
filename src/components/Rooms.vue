<template lang="html">
    <div class="rooms" v-if='servers'>
        <div class='room' v-if='userId == servers[selectedServer].userId' @click='createRoom()'>Add Room</div>
        <div class='room' v-for='(room, index) in servers[selectedServer].rooms' @click='joinRoom(room, index)'>
            <p class='room-name'>{{ room.name }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    methods: {
        joinRoom(room, index){
            this.$store.dispatch('joinRoom', {
                room: room,
                index: index,
                serverId: this.servers[this.selectedServer].id
            })
        },
        createRoom(){

        }
    },
    computed: {
        servers(){
            return this.$store.state.servers
        },
        selectedServer(){
            return this.$store.state.selectedServer
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
.room {
    display: flex;
    align-items: center;
    padding: 20px;
    color: #ffffff;
    cursor: pointer;
}
.room:hover {
    background-color: #34373c;
}
</style>
