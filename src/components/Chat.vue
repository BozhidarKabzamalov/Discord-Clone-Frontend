<template lang="html">
    <div class="chat">
        <div class='chat-container'>
            <p class='selected-room-name'>{{ server.rooms[selectedServerRoom].name }}</p>
            <div class="messages">
                <div class='message' v-for='(message, index) in server.rooms[selectedServerRoom].messages'>
                    <div class="image-container">
                        <img class='responsive-image' :src="message.user.image" :alt="message.user.username">
                    </div>
                    <div>
                        <div class="username-date-container">
                            <p class='username'>{{ message.user.username }}</p>
                            <p class='date'>{{ getTimeAndDate(message.time) }}</p>
                        </div>
                        <p class='message-body' v-html="message.message"></p>
                    </div>
                    <i class="delete-message fas fa-times" @click='deleteMessage(message, index)'></i>
                </div>
            </div>
            <div class="form-container">
                <form class='send-message' @submit='sendMessage($event)'>
                    <input class='message-input' v-model="message" placeholder="Type a message">
                </form>
                <div>
                    <div class="emojis-picker-container" v-if='toggleEmojiWindow'>
                        <!--<div class="emoji" v-for='emoji in this.emoji' @click='message += emoji.keyword + " "'>
                            <img class='responsive-image' :src="emoji.image" :alt="emoji.keyword" @click='toggleEmojiWindow = !toggleEmojiWindow'>
                        </div>-->
                    </div>
                    <div class="emojis-button-container">
                        <!--<div class="emojis-button" @click='toggleEmojiWindow = !toggleEmojiWindow'>
                            <img class='responsive-image' :src="this.emoji[0].image" :alt="this.emoji[0].keyword">
                        </div>-->
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
    props: [
        'server'
    ],
    data(){
        return {
            message: '',
            toggleEmojiWindow: false
        }
    },
    methods: {
        async sendMessage(event){
            event.preventDefault()

            let fullMessage = {
                roomId: this.server.rooms[this.selectedServerRoom].id,
                message: this.message
            }

            try {
                let response = await axios.post('/createMessage', fullMessage)

                this.socket.emit('messageToServer', response.data.message)
                this.message = ''
            } catch (error) {
                console.log(error)
            }

        },
        async deleteMessage(message, index){
            let response = await axios.post('/deleteMessage', { messageId: message.id })

            this.server.rooms[this.selectedServerRoom].messages.splice(index, 1)
        },
        getTimeAndDate(timestamp){
            return moment(timestamp).subtract(10, 'days').calendar();
        },
        insertEmoji(message){
            this.emoji.forEach(emoji => {
                let regularExpression = new RegExp("(?:^|\\s)"+ emoji.keyword + "\\b", "g")
                let html = `<span class="emoji ${emoji.keyword}"><img class='responsive-image' src="${emoji.image}" alt="${emoji.keyword}"></span>`
                message = message.replace(regularExpression, html)
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
        selectedServerRoom(){
            return this.$store.state.selectedServerRoom
        }
    }
}
</script>

<style lang="css" scoped>
.chat {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #36393f;
}
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.selected-room-name {
    padding: 20px;
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}
.image-container {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
}
.messages {
    flex: 1;
    padding: 20px;
}
.message-body {
    display: flex;
    align-items: center;
}
.message {
    display: flex;
    align-items: center;
    background-color: #40444b;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    color: #e0e0e0;
}
.message:last-child {
    margin-bottom: 0px;
}
.delete-message {
    display: none;
    margin-left: auto;
    cursor: pointer;
}
.message:hover > .delete-message {
    display: block;
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
