<template lang="html">
    <div class="servers" v-if='servers'>
        <div v-for='(server, index) in servers' class="server-container">
            <div class="server-active">
                <div v-if='selectedServer === index' class="server-active-bar"></div>
                <div v-else class="server-inactive-bar"></div>
            </div>
            <div class="server" @click='joinServer(server, index)'>
                <img class='server-image' :src="server.thumbnail" alt="">
            </div>
        </div>
        <AddServer></AddServer>
    </div>
</template>

<script>
import AddServer from './AddServer'

export default {
    components: {
        AddServer
    },
    methods: {
        joinServer(server, index){
            this.$store.dispatch('joinServer', {
                server: server,
                index: index
            })
        }
    },
    computed: {
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
.servers {
    width: 72px;
    background-color: #202225;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.server-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 12px;
}
.server-active {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 48px;
}
.server-active-bar {
    width: 8px;
    height: 40px;
    border-radius: 0 4px 4px 0;
    background-color: #ffffff;
    margin-left: -4px;
    transition: all .2s ease-in-out;
}
.server-inactive-bar {
    width: 8px;
    height: 0px;
    border-radius: 0 4px 4px 0;
    background-color: #ffffff;
    margin-left: -8px;
    transition: all .2s ease-in-out;
}
.server-container:hover .server-inactive-bar {
    margin-left: -4px;
    height: 16px;
}
.server {
    width: 48px;
    height: 48px;
    cursor: pointer;
}
.server-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

</style>
