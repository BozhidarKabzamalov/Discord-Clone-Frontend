<template>
    <div class="home">
        <div class="servers">
            <div v-for='(server, index) in servers' class="server" @click='joinServer(server, index)'>

            </div>
        </div>

        <div class="rooms">
            <div class='room' v-for='(room, index) in servers[selectedServer].rooms' @click='joinRoom(room, index)'>
                <p>{{ room.name }}</p>
            </div>
        </div>

        <div class='chat-container'>
            <div class="chat">
                <p class='room-name'>{{ servers[selectedServer].rooms[selectedServerRoom].name }}</p>
                <div class="messages">
                    <div class='message-container' v-for='message in messages'>
                        <div class="username-date-container">
                            <p class='username'>{{ message.username }}</p>
                            <p class='date'>{{ getTimeAndDate(message.time) }}</p>
                        </div>
                        <p v-html="message.message"></p>
                    </div>
                </div>

                <div class="form-container">

                    <form class='send-message' @submit='sendMessage($event)'>
                        <input class='message-input' v-model="message" placeholder="Type a message">
                    </form>

                    <div class="emojis-container" v-if='toggleEmojiWindow'>
                        <div class="emoji" v-for='emoji in this.emojis' @click='message += emoji.keyword + " "'>
                            <img class='responsive-image' :src="emoji.url" :alt="emoji.keyword">
                        </div>
                    </div>

                    <div class="emojis">
                        <div class="emojis-button" @click='toggleEmojiWindow = !toggleEmojiWindow'>
                            <img class='responsive-image' :src="this.emojis[0].url" :alt="this.emojis[0].keyword">
                        </div>
                    </div>

                </div>


            </div>

        </div>

        <div class="users">
            <p class='user' v-for='user in users'>{{ user }}</p>
        </div>

    </div>
</template>

<script>
import io from 'socket.io-client'
import moment from 'moment'

export default {
    data(){
        return {
            socket: '',
            users: [],
            servers: [
                {
                    name: 'TFT',
                    image: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltfe81204b8ec63e0e/5e6184a918d3347ceffbbd6d/TFT.S3_GALAXIES.ARTICLE-2.jpg',
                    endpoint: '/tft',
                    rooms: [
                        {
                            name: 'General', namespace: 'TFT'
                        },
                        {
                            name: 'Builds', namespace: 'TFT'
                        },
                    ]
                },
                {
                    name: 'LoL',
                    image: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltfe81204b8ec63e0e/5e6184a918d3347ceffbbd6d/TFT.S3_GALAXIES.ARTICLE-2.jpg',
                    endpoint: '/lol',
                    rooms: [
                        {
                            name: 'General', namespace: 'LoL'
                        },
                        {
                            name: 'Champions', namespace: 'LoL'
                        },
                    ]
                },
                {
                    name: 'WoW',
                    image: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltfe81204b8ec63e0e/5e6184a918d3347ceffbbd6d/TFT.S3_GALAXIES.ARTICLE-2.jpg',
                    endpoint: '/wow',
                    rooms: [
                        {
                            name: 'General', namespace: 'WoW'
                        },
                        {
                            name: 'PVP', namespace: 'WoW'
                        },
                    ]
                },
            ],
            username: 'Bozhidar',
            messages: [],
            message: '',
            toggleEmojiWindow: false,
            emojis: [
                {
                    keyword: "LOL",
                    url: "http://localhost:8080/favicon.ico"
                }
            ],
            selectedServer: 0,
            selectedServerRoom: 0
        }
    },
    methods: {
        sendMessage(event){
            event.preventDefault()
            let fullMessage = {
                username: this.username,
                message: this.insertEmojis(this.message),
                time: Date.now()
            }
            this.socket.emit('messageToServer', fullMessage)
            this.message = ''
        },
        joinServer(server, index){
            if (this.socket) {
                this.socket.close()
            }
            this.selectedServer = index
            this.socket = io('http://localhost:3000' + server.endpoint)
            this.joinRoom(server.rooms[0], 0)
        },
        joinRoom(room, index){
            this.selectedServerRoom = index
            this.socket.emit('joinRoom', room.name)
        },
        getTimeAndDate(timestamp){
            return moment(timestamp).subtract(10, 'days').calendar();
        },
        insertEmojis(message){
            this.emojis.forEach(emoji => {
                message = message.replace(new RegExp("(?:^|\\s)"+ emoji.keyword + "\\b", "g"), `<span class="${emoji.keyword}"><img src="${emoji.url}" alt="${emoji.keyword}"></span>`)
            })

            return message
        },
    },
    watch: {
        socket: function(){
            this.socket.on('messageToClient', (message) => {
                this.messages.push(message)
                console.log('messageToClient')
            })
            this.socket.on('chatHistory', (chatHistory) => {
                this.messages = chatHistory
                console.log('Chat History')
            })
        }
    },
    mounted(){
        if (this.socket) {
            this.socket.close()
        }
        this.socket = io('http://localhost:3000' + this.servers[this.selectedServer].endpoint)
        this.joinRoom(this.servers[this.selectedServer].rooms[0], 0)
    }
}
</script>

<style scoped>

/* Home CSS */

.home {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
}

/* Chat CSS */

.chat-container {
    flex: 1;
}
.chat {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #36393f;
}
.messages {
    flex: 1;
    padding: 20px;
    /*overflow-y: scroll;*/
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
.emojis {
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
.emojis-container {
    position: absolute;
    top: -200px;
    right: 0;
    width: 100%;
    height: 200px;
    padding: 10px;
    display: flex;
    background-color: #2f3136;
}
.emoji {
    height: 30px;
    width: 30px;
}

/* Servers CSS */

.servers {
    width: 72px;
    background-color: #202225;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.server {
    width: 48px;
    height: 48px;
    background-color: #7289da;
    margin-top: 12px;
    border-radius: 50%;
}

/* Users CSS */

.users {
    width: 239px;
    background-color: #2f3136;
    padding: 15px;
}
.user {
    margin-bottom: 10px;
}

/* Rooms CSS */

.rooms {
    width: 240px;
    background-color: #2f3136;
}
.room {
    display: flex;

    align-items: center;
    padding: 20px;
    color: #ffffff;
}
.room-name {
    padding: 15px 0 0 15px;
    color: #ffffff;
    font-weight: 500;
    font-size: 18px;
}
</style>
