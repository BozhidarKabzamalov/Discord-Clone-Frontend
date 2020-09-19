<template lang="html">
    <div class="navigation">

        <router-link class="server-container" :to="{ name: 'friendsList' }">
            <div class="server-active">
                <div v-if='selectedServer === null' class="server-active-bar"></div>
                <div v-else class="server-inactive-bar"></div>
            </div>
            <div class="server">
                <div class="home-image">
                    <p><i class="fas fa-users"></i></p>
                </div>
            </div>
        </router-link>

        <router-link class="server-container" v-for='(server, index) in servers' :to="{ name: 'server', params: { endpoint: server.endpoint.substr(1) }}">
            <div class="server-active">
                <div v-if='selectedServer == index' class="server-active-bar"></div>
                <div v-else class="server-inactive-bar"></div>
            </div>
            <div class="server">
                <img class='server-image' :src="server.thumbnail" :alt="server.name">
            </div>
        </router-link>

        <i class="toggle-join-create-server fas fa-plus" @click="openModal()"></i>

        <Modal v-show="isModalOpen" @closeModal="closeModal()">
            <ServerCreateOrJoin :selectedAction='selectedAction' @setSelectedAction='setSelectedAction' @closeModal='closeModal' @resetSelectedAction='resetSelectedAction'></ServerCreateOrJoin>
        </Modal>

    </div>
</template>

<script>
import ServerCreateOrJoin from './ServerCreateOrJoin'
import Modal from './Modal.vue';

export default {
    components: {
        ServerCreateOrJoin,
        Modal
    },
    data(){
        return {
            isModalOpen: false,
            selectedAction: null
        }
    },
    methods: {
        setSelectedAction(action){
            this.selectedAction = action
        },
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
            this.selectedAction = null
        },
        resetSelectedAction(){
            this.selectedAction = null
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
.navigation {
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
.home-image {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 18px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: #7289da;
}
.toggle-join-create-server {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background-color: #36393f;
    color: #43b581;
    margin-top: 12px;
    border-radius: 50%;
    transition: all .2s ease-in-out;
    cursor: pointer;
}
.toggle-join-create-server:hover {
    border-radius: 20px;
    background-color: #43b581;
    color: #f1f1f1;
}
</style>
