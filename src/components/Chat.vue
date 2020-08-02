<template lang="html">
    <div class='chat-container' v-if='servers'>
        <div class="chat">
            <p class='selected-room-name'>{{ servers[selectedServer].rooms[selectedServerRoom].name }}</p>
            <div class="messages">
                <div class='message-container' v-for='message in servers[selectedServer].rooms[selectedServerRoom].messages'>
                    <div class="username-date-container">
                        <p class='username'>{{ message.username }}</p>
                        <p class='date'>{{ getTimeAndDate(message.time) }}</p>
                    </div>
                    <p class='message' v-html="message.message"></p>
                </div>
            </div>

            <div class="form-container">

                <form class='send-message' @submit='sendMessage($event)'>
                    <input class='message-input' v-model="message" placeholder="Type a message">
                </form>

                <div class="emojis-picker-container" v-if='toggleEmojiWindow && emoji'>
                    <div class="emoji" v-if='emoji' v-for='emoji in this.emoji' @click='message += emoji.keyword + " "'>
                        <img class='responsive-image' :src="emoji.image" :alt="emoji.keyword" @click='toggleEmojiWindow = !toggleEmojiWindow'>
                    </div>
                </div>

                <div class="emojis-button-container" v-if='emoji'>
                    <div class="emojis-button" @click='toggleEmojiWindow = !toggleEmojiWindow'>
                        <img class='responsive-image' :src="this.emoji[0].image" :alt="this.emoji[0].keyword">
                    </div>
                </div>

            </div>


        </div>

    </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
    data(){
        return {
            message: '',
            toggleEmojiWindow: false
        }
    },
    methods: {
        sendMessage(event){
            event.preventDefault()

            let fullMessage = {
                roomId: this.servers[this.selectedServer].rooms[this.selectedServerRoom].id,
                username: this.username,
                userId: this.userId,
                message: this.insertEmoji(this.message),
                time: Date.now()
            }

            axios.post('/createMessage', fullMessage)
            .then(response => {
                console.log(response)
            }).catch((error) => console.log(error));

            this.socket.emit('messageToServer', fullMessage)
            this.message = ''
        },
        getTimeAndDate(timestamp){
            return moment(timestamp).subtract(10, 'days').calendar();
        },
        insertEmoji(message){
            this.emoji.forEach(emoji => {
                message = message.replace(new RegExp("(?:^|\\s)"+ emoji.keyword + "\\b", "g"), `<span class="emoji ${emoji.keyword}"><img class='responsive-image' src="${emoji.image}" alt="${emoji.keyword}"></span>`)
            })

            return message
        }
    },
    computed: {
        username(){
            return this.$store.state.username
        },
        userId(){
            return this.$store.state.userId
        },
        socket(){
            return this.$store.state.socket
        },
        servers(){
            return this.$store.state.servers
        },
        selectedServer(){
            return this.$store.state.selectedServer
        },
        selectedServerRoom(){
            return this.$store.state.selectedServerRoom
        },
        emoji(){
            return this.$store.state.emoji
        }
    },
    watch: {
        socket: function(){
            this.socket.on('messageToClient', (message) => {
                this.servers[this.selectedServer].rooms[this.selectedServerRoom].messages.push(message)
            })
            this.socket.on('chatHistory', (chatHistory) => {
                this.servers[this.selectedServer].rooms[this.selectedServerRoom].messages = chatHistory
            })
        }
    }
}
</script>

<style lang="css" scoped>
.chat-container {
    flex: 1;
}
.chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #36393f;
}
.selected-room-name {
    padding: 20px;
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}
.messages {
    flex: 1;
    padding: 20px;
}
.message {
    display: flex;
    align-items: center;
}
.message-container {
    background-color: #40444b;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    color: #e0e0e0;
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
.form-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.emojis-button-container {
    position: relative;
    margin-right: 20px;
    background-color: #40444b;
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 5px 5px 0px;
}
.send-message {
    position: relative;
    padding: 20px 0px 20px 20px;
    flex: 1;
}
.message-input {
    width: 100%;
    padding: 15px;
    outline: none;
    border: none;
    background-color: #40444b;
    color: #dcddde;
    font-size: 14px;
    border-radius: 5px 0 0 5px;
}
.emojis-button {
    cursor: pointer;
    height: 30px;
    width: 30px;
    filter: grayscale(100%);
    transition: all .2s ease-in-out;
}
.emojis-button:hover {
    filter: grayscale(0%);
    transform: scale(1.1);
}
.emojis-picker-container {
    position: absolute;
    top: -200px;
    right: 0;
    width: 100%;
    height: 200px;
    padding: 10px;
    display: flex;
    background-color: #2f3136;
}
</style>
