<template lang="html">
    <div>
        <div class='add-server' @click='addServerWindow = true'>
            <i class="fas fa-plus"></i>
        </div>
        <div class='create-server-window' v-if='addServerWindow'>
            <div class="create-server-form-container">
                <form class="create-server-form" @submit='createServer($event)'>
                    <h1>Create your own server</h1>
                    <p>Make a place for you to hang out with your friends.</p>
                    <label :for="serverName">server name</label>
                    <input v-model="serverName" placeholder="Enter a server name">
                    <input type="file" name="image" @change="handleFileUpload($event)">
                    <button type="submit" name="button">Create</button>
                </form>
                <div class="black-screen" @click='addServerWindow = false'></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            addServerWindow: false,
            serverName: '',
            serverImage: ''
        }
    },
    methods: {
        handleFileUpload(event){
            this.serverImage = event.target.files[0]
        },
        async createServer(event){
            event.preventDefault()

            let server = new FormData()
            server.append('name', this.serverName)
            server.append('image', this.serverImage)
            server.append('userId', this.userId)

            try {
                let response = await axios.post('/createServer', server)

                this.addServerWindow = false;
                this.$store.commit('addServer', response.data)

                let data = {
                    index: this.index,
                    server: response.data
                }

                this.$store.dispatch('joinServer', data)
            } catch (error) {
                console.log(error)
            }

        }
    },
    computed: {
        index(){
            return this.$store.state.servers.length - 1
        },
        userId(){
            return this.$store.state.userId
        }
    }
}
</script>

<style lang="css" scoped>
.add-server {
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
.add-server:hover {
    border-radius: 20px;
    background-color: #43b581;
    color: #f1f1f1;
}
.create-server-window {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
.create-server-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
}
.create-server-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 540px;
    background-color: #ffffff;
    border-radius: 4px;
    z-index: 9999;
    padding: 40px;
}
.create-server-form button {
    width: 100px;
    height: 40px;
    background-color: #7289da;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.create-server-form h1 {
    font-weight: 700;
    font-size: 20px;
    color: #7289da;
    margin-bottom: 20px;
    text-transform: uppercase;
}
.create-server-form p {
    color: #747f8d;
    font-size: 16px;
    margin-bottom: 60px;
}
.create-server-form label {
    font-size: 13px;
    font-weight: 700;
    color: #4f5660;
    text-transform: uppercase;
    margin-bottom: 10px;
}
.create-server-form input {
    color: #2f3136;
    font-size: 16px;
    margin-bottom: 60px;
    padding: 12px 4px;
    border: none;
    border-bottom: 2px solid #e3e5e8;
    outline: none;
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
</style>
