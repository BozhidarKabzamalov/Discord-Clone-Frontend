<template lang="html">
    <div class="server" v-if='server'>
        <ServerRooms :server='server'></ServerRooms>
        <Chat :server='server'></Chat>
        <Members :server='server' :members='server.users'></Members>
    </div>
</template>

<script>
import ServerRooms from '../components/ServerRooms'
import Chat from '../components/Chat'
import Members from '../components/Members'

export default {
    components: {
        ServerRooms,
        Chat,
        Members
    },
    data(){
        return {
            serverEndpoint: this.$route.params.endpoint
        }
    },
    computed: {
        server(){
            return this.$store.state.servers.find((server) => {
                return server.endpoint == '/' + this.serverEndpoint
            })
        }
    },
    watch: {
        $route(to, from) {
            this.serverEndpoint = this.$route.params.endpoint
        },
        server(newServer){
            this.$store.dispatch('joinServer', newServer)
            this.$store.commit('setSelectedServer', newServer)
        }
    },
    mounted(){
        this.$store.dispatch('joinServer', this.server)
        this.$store.commit('setSelectedServer', this.server)
    }
}
</script>

<style lang="css" scoped>
.server {
    display: flex;
    flex: 1;
}
</style>
