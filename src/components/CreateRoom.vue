<template lang="html">
    <div class='create-room'>
        <img class='toggle-create-room' v-if='servers && userId == servers[selectedServer].userId' src="@/assets/svg/plus.svg" alt="plus" @click='createRoomWindow = true'>
        <div class="create-room-window" v-if='createRoomWindow'>
            <div class="create-room-container">
                <form class="create-room-form" @submit='createRoom($event)'>
                    <h2>Create a chat room</h2>
                    <input type="text" v-model='roomName'>
                </form>
            </div>
            <div class="black-screen" @click='createRoomWindow = false'></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            createRoomWindow: false,
            roomName: ''
        }
    },
    methods: {
        createRoom(){
            let room = {
                name: this.roomName,
                serverId: this.servers[this.selectedServer].id
            }

            axios.post('/createRoom', room)
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
        userId(){
            return this.$store.state.userId
        }
    }
}
</script>

<style lang="css" scoped>
.create-room {
    margin-left: auto;
    margin-right: 20px;
}
.toggle-create-room {
    height: 16px;
    width: auto;
    cursor: pointer;
}
.create-room-window {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
.black-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
}
.create-room-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.create-room-form {
    display: flex;

    align-items: center;
    flex-direction: column;
    background-color: #36393f;
    width: 500px;
    height: 500px;
    z-index: 9999;
    box-shadow: 0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2);
    border-radius: 5px;
    padding: 20px;
}
.create-room-form h2 {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: .3px;
    color: #ffffff;
    margin-bottom: 20px;
}
.create-room-form input {
    border-color: #040405;
    padding: 10px;
    height: 40px;
    font-size: 16px;
    width: 100%;
    border-radius: 3px;
    color: #dcddde;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: 0;
}
</style>
