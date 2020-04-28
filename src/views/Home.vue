<template>
    <div class="home">
        <div class="wrapper">
            <div class='username-container' v-if='!this.username'>
                <form class='username-form' @submit='setUsername($event)'>
                    <input v-model="usernameInput" placeholder="Pick a username">
                    <div class='enter-chat' @click='setUsername($event)'>Enter chat</div>
                </form>
            </div>
            <div v-else class="chat">
                <div class="messages">
                    <div class='message-container' v-for='message in messages'>
                        <div class="username-date-container">
                            <p class='username'>{{ message.username }}</p>
                            <p class='date'>{{ getTimeAndDate(message.time) }}</p>
                        </div>
                        <p class='message'>{{ message.message }}</p>
                    </div>
                </div>
            </div>
            <form @submit='sendMessage($event)'>
                <input class='message-input' v-model="message" placeholder="Type a message">
            </form>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    import moment from 'moment'

    export default {
        data(){
            return {
                socket: io.connect('http://localhost:3000'),
                usernameInput: null,
                username: null,
                messages: [],
                message: null
            }
        },
        methods: {
            setUsername(event){
                event.preventDefault()
                this.username = this.usernameInput
                this.usernameInput = null
            },
            sendMessage(event){
                event.preventDefault()
                let fullMessage = {
                    username: this.username,
                    message: this.message,
                    time: Date.now()
                }
                this.socket.emit('message', fullMessage)
                this.message = null
            },
            getTimeAndDate(timestamp){
                return moment(timestamp).subtract(10, 'days').calendar();
            }
        },
        mounted(){
            this.socket.on('message', (message) => {
                this.messages.push(message)
            });
        }
    }
</script>

<style scoped>
    .home {
        padding: 20px 0;
    }
    .username-container {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .username-form {
        display: flex;
        flex-direction: column;
    }
    .enter-chat {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        background-color: #5bc0de;
        border-radius: 10px;
        color: #f1f1f1;
        font-weight: bold;
    }
    .chat {
        background-color: #ffffff;
        border: 1px solid #c0c2c6;
    }
    .messages {
        padding: 20px;
        height: 500px;
        overflow-y: scroll;
    }
    .message-container {
        background-color: #e9ebee;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    .message-container:last-child {
        margin-bottom: 0px;
    }
    .username-date-container {
        display: flex;
        margin-bottom: 10px;
    }
    .username {
        margin: 0 10px 0 0;
        font-weight: 500;
    }
    .date {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
    }
    .message {
        word-wrap: break-word;
    }
    .message-input {
        width: 100%;
        padding: 15px;
        outline: none;
        border: none;
        border-bottom: 1px solid #c0c2c6;
        border-right: 1px solid #c0c2c6;
        border-left: 1px solid #c0c2c6;
    }
</style>
