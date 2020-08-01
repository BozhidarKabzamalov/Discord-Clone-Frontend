<template lang="html">
    <div class='server-settings'>
        <img class='toggle-server-settings' src="@/assets/svg/cog.svg" alt="cog" @click='serverSettingsWindow = true'>
        <div class="settings" v-if='serverSettingsWindow'>
            <div class="server-overview">
                <h1>Server Overview</h1>
                <div class="server">
                    <div class="thumbnail-container">
                        <img :src="selectedServer.thumbnail" alt="">
                    </div>
                    <div class="name-container">
                        <p>Server name</p>
                        <input type="text" v-model='serverName'>
                    </div>
                </div>
                <div class="update-server" @click='updateServer()'>Save Changes</div>
                <img class="exit" src="@/assets/svg/x.svg" alt="x" @click='serverSettingsWindow = false'>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            serverSettingsWindow: false,
            serverName: this.$store.state.servers[this.$store.state.selectedServer].name
        }
    },
    methods: {
        updateServer(){
            let data = {
                server: this.selectedServer,
                newName: this.serverName
            }

            axios.post('/updateServer', data)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    computed: {
        selectedServer(){
            return this.$store.state.servers[this.$store.state.selectedServer]
        }
    }
}
</script>

<style lang="css" scoped>
.server-settings {
    margin-left: auto;
}
.toggle-server-settings {
    height: 19px;
    width: auto;
    cursor: pointer;
}
.settings {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #2f3136;
}
.server-overview {
    position: relative;
    width: 800px;
    height: 100%;
    margin: 0 auto;
    background-color: #36393f;
    padding: 60px;
}
.exit {
    width: 50px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 30px 30px 0 0;
    cursor: pointer;
}
.server-overview h1 {
    color: #ffffff;
    margin-bottom: 60px;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
}
.server {
    display: flex;
    margin-bottom: 60px;
}
.thumbnail-container {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
}
.name-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
}
.name-container input {
    color: #dcddde;
    font-size: 16px;
    padding: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
    border-radius: 3px;
}
.name-container p {
    display: flex;
    flex: 1 1 50%;
    color: #8e9297;
    font-weight: 600;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 12px;
}
.update-server {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 40px;
    background-color: #43b581;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    padding: 10px;
    margin: 0 auto;
}
</style>