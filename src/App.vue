<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import io from 'socket.io-client'

    export default {
        computed: {
            servers(){
                return this.$store.state.servers
            },
            selectedServer(){
                return this.$store.state.selectedServer
            }
        },
        mounted(){
            this.$store.dispatch('getServers')
            .then((result) => {
                this.$store.commit('socket', io('http://localhost:3000' + this.servers[this.selectedServer].endpoint))
            })
            .catch((error) => {
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
