<template lang="html">
    <div>
        <div class='add-server' @click='addServerWindow = true'>+</div>
        <div class='create-server-window' v-if='addServerWindow'>
            <div class="create-server-form-container">
                <form class="create-server-form" @submit='createServer($event)'>
                    <input v-model="addServerInput.name" placeholder="Type a message">
                    <button type="submit" name="button">Submit</button>
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
            addServerInput: {
                name: '',
                image: 'https://media.discordapp.net/attachments/733747075455647898/733748917274935426/1.png?width=676&height=676'
            }
        }
    },
    methods: {
        createServer(event){
            event.preventDefault()
            let server = {
                name: this.addServerInput.name,
                image: this.addServerInput.image,
                userId: localStorage.userId
            }

            axios.post('http://localhost:3000/createServer', server)
            .then((response) => {
                this.addServerWindow = false;
                this.$store.commit('addServer', response.data)
            })
            .catch((error) => {
                console.log(error);
            });
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
    font-size: 30px;
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
    width: 540px;
    height: 420px;
    background-color: #ffffff;
    border-radius: 4px;
    z-index: 9999;
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
