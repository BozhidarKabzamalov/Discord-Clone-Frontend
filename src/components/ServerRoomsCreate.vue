<template lang="html">
    <div>
        <i class="toggle-create-room fas fa-plus" @click='openModal()'></i>
        <Modal v-show='isModalOpen' @closeModal='closeModal()'>
            <form class="create-room-form" @submit='createRoom($event)'>
                <h2>Create a chat room</h2>
                <h3>Room name</h3>
                <input type="text" v-model='roomName'>
                <button type="submit" name="button">Create room</button>
            </form>
        </Modal>
    </div>
</template>

<script>
import axios from 'axios'
import Modal from './Modal'

export default {
    components: {
        Modal
    },
    props: [
        'server'
    ],
    data(){
        return {
            roomName: '',
            isModalOpen: false
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        },
        async createRoom(event){
            event.preventDefault()

            let room = {
                name: this.roomName,
                serverId: this.server.id
            }

            try {
                let response = await axios.post('/createRoom', room)
                this.server.rooms.push(response.data.room)
                this.closeModal()
            } catch (error) {
                console.log(error)
            }

        }
    }
}
</script>

<style lang="css" scoped>
.toggle-create-room {
    color: #8e9297;
    cursor: pointer;
    margin-right: 20px;
}
.create-room-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #36393f;
    width: 500px;
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
    margin-bottom: 40px;
}
.create-room-form h3 {
    color: #8e9297;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
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
    margin-bottom: 40px;
}
.create-room-form button {
    min-width: 96px;
    min-height: 38px;
    color: #fff;
    background-color: #7289da;
    border: none;
    border-radius: 3px;
    font-size: 13px;
    line-height: 16px;
    padding: 2px 16px;
    user-select: none;
    outline: 0;
    font-weight: 600;
    cursor: pointer;
}
</style>
