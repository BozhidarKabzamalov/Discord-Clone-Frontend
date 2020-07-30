<template lang="html">
    <div class="rooms" v-if='servers'>

        <div class="selected-server">
            <p class='selected-server-name'>{{ servers[selectedServer].name }}</p>
        </div>

        <!--<CreateRoom></CreateRoom>-->

        <div :class="[{'active': index == selectedServerRoom}, 'room']" v-for='(room, index) in servers[selectedServer].rooms' @click='joinRoom(room, index)'>
            <p class='room-name'>{{ room.name }}</p>
        </div>

    </div>
</template>

<script>
import CreateRoom from './CreateRoom'
import axios from 'axios'

export default {
    components: {
        CreateRoom
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
    font-weight: 700;
    display: flex;
    align-items: center;
    padding: 20px;
    color: #72767d;
    cursor: pointer;
    user-select: none;
}
.active {
    cursor: auto;
    color: rgba(255, 255, 255, 0.8);
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
.delete-room {
    display: none;
    margin: 0 0 0 auto;
}
</style>
