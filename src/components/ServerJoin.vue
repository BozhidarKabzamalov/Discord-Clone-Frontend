<template lang="html">
    <div>
        <form class="join-server-form" @submit='joinServer($event)'>
            <h1>Join a server</h1>
            <p>Just enter the name of the server you desire to join.</p>
            <div class="input-container">
                <label class='text-input-label' :for="serverName">server name</label>
                <input type="text" v-model="serverName" placeholder="Enter a server name">
            </div>
            <div class="button-container">
                <div class='go-back-button' @click="$emit('goBack')">Back</div>
                <button class='join-server-button' type="submit" name="button">Join</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            serverName: ''
        }
    },
    methods: {
        async joinServer(event){
            event.preventDefault()

            let payload = {
                serverName: this.serverName
            }

            let response = await axios.post('/joinServer', payload)
            this.$emit('closeModal')
        }
    }
}
</script>

<style lang="css" scoped>
.join-server-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 540px;
    background-color: #ffffff;
    border-radius: 4px;
    z-index: 9999;
    padding: 40px 0 0 0;
}
.join-server-form h1 {
    font-weight: 700;
    font-size: 20px;
    color: #43b581;
    margin-bottom: 20px;
    text-transform: uppercase;
}
.join-server-form p {
    color: #747f8d;
    font-size: 16px;
    margin-bottom: 60px;
}
.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 20px 60px 20px;
}
.text-input-label {
    font-size: 13px;
    font-weight: 700;
    color: #4f5660;
    text-transform: uppercase;
}
.join-server-form input {
    color: #2f3136;
    font-size: 16px;
    padding: 12px 4px;
    border: none;
    border-bottom: 2px solid #e3e5e8;
    outline: none;
}
.button-container {
    display: flex;
    justify-content: space-between;
    background-color: #f6f6f7;
    width: 100%;
}
.join-server-button, .go-back-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 20px 40px;
}
.join-server-button {
    background-color: #43b581;
}
.go-back-button {
    color: rgba(0, 0, 0, 0.8);
}
</style>
