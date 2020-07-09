<template lang="html">
    <div class="rooms" v-if='servers'>
        <div class='room' v-for='(room, index) in servers[selectedServer].rooms' @click='joinRoom(room, index)'>
            <p class='room-name'>{{ room.name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        joinRoom(room, index){
            this.$store.commit('selectedServerRoom', index)
            this.socket.emit('joinRoom', room.name)
        },
    },
    computed: {
        socket(){
            return this.$store.state.socket
        },
        servers(){
            return this.$store.state.servers
        },
        selectedServer(){
            return this.$store.state.selectedServer
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
}
.room-name {
    cursor: pointer;
}
</style>
