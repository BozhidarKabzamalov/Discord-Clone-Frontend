<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    mounted(){
        this.$store.dispatch('getEmoji')
        this.$store.dispatch('getServers')
        .then(result => {
            this.$store.commit('socket', io('http://localhost:3000' + this.$store.state.servers[this.$store.state.selectedServer].endpoint))
            this.$store.state.socket.emit('joinRoom', this.$store.state.servers[this.$store.state.selectedServer].rooms[0].name)
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>

<style>
*, *:after, *:before {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-decoration: none;
    list-style-type: none;
}
body {
    font-family: 'Roboto', 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif;
}
.responsive-image {
    width: 100%;
    height: 100%;
}
</style>
