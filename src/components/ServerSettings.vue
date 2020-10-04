<template lang="html">
    <div>
        <i class="toggle-server-settings fas fa-cog" @click='openModal()'></i>
        <Modal v-if='isModalOpen' @closeModal='closeModal()'>
            <div class="server-settings">
                <form class="server-settings-form" @submit='updateServer($event)'>
                    <h1>Edit server</h1>
                    <div class="inputs-container">
                        <div class="input-container">
                            <label class='text-input-label' :for="serverName">server name</label>
                            <input type="text" v-model="serverName" placeholder="Enter a server name">
                        </div>
                        <div class="input-container">
                            <label class="file-input-label" for="file-upload">
                                <img class='altered-image' v-if='croppedImage' :src="croppedImageUrl">
                                <img class='altered-image' v-else :src="server.thumbnail" :alt="server.name">
                            </label>
                            <input id='file-upload' type="file" name="image" @change="handleFileUpload($event)">
                        </div>
                    </div>
                    <div class="button-container">
                        <div class='delete-button' @click='deleteServer()'>Delete</div>
                        <button class='save-button' type="submit" name="button">Save</button>
                    </div>
                </form>
                <ImageCropper v-if='imageCropperWindow' :originalImage='originalImage' @closeCropper='closeCropper'></ImageCropper>
            </div>
        </Modal>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import { Cropper } from 'vue-advanced-cropper'
import Modal from './Modal'
import ImageCropper from './ImageCropper'

export default {
    components: {
        Modal,
        ImageCropper
    },
    props: [
        'server'
    ],
    data(){
        return {
            isModalOpen: false,
            serverName: this.server.name,
            originalImage: '',
            croppedImage: null,
            imageCropperWindow: false
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
            this.serverName = this.server.name
            this.originalImage = '',
            this.croppedImage = null,
            this.imageCropperWindow = false
        },
        closeCropper(croppedImage){
            this.croppedImage = croppedImage
            this.imageCropperWindow = false
        },
        handleFileUpload(event){
            this.originalImage = URL.createObjectURL(event.target.files[0])
            this.imageCropperWindow = true
        },
        async updateServer(){
            event.preventDefault()

            let data = new FormData()
            data.append('serverId', this.server.id)
            data.append('newName', this.serverName)
            data.append('image', this.croppedImage)

            try {
                let response = await axios.post('/updateServer', data)

                let index = this.servers.indexOf(this.server)
                this.$set(this.servers, index, response.data.server)
                this.closeModal()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteServer(){
            try {
                let response = await axios.post('/deleteServer', this.server)
                this.$store.commit('removeServer', this.server)
                this.closeModal()
                router.replace('/')
            } catch (error) {
                console.log(error)
            }
        }
    },
    computed: {
        servers(){
            return this.$store.state.server.servers
        },
        croppedImageUrl(){
            return URL.createObjectURL(this.croppedImage)
        }
    },
    watch: {
        server(){
            this.serverName = this.server.name
        }
    }
}
</script>

<style lang="css" scoped>
.toggle-server-settings {
    cursor: pointer;
    color: #b9bbbe;
}
.server-settings {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.server-settings-form {
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
.save-button {
    width: 100px;
    height: 40px;
    background-color: #7289da;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 20px 40px;
}
.server-settings-form h1 {
    font-weight: 700;
    font-size: 20px;
    color: #7289da;
    margin-bottom: 20px;
    text-transform: uppercase;
}
.server-settings-form p {
    color: #747f8d;
    font-size: 16px;
    margin-bottom: 60px;
}
.text-input-label {
    font-size: 13px;
    font-weight: 700;
    color: #4f5660;
    text-transform: uppercase;
}
.server-settings-form input {
    color: #2f3136;
    font-size: 16px;
    padding: 12px 4px;
    border: none;
    border-bottom: 2px solid #e3e5e8;
    outline: none;
}
.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 20px 0 20px;
}
input[type="file"] {
    display: none;
}
.file-input-label {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 138px;
    width: 138px;
    background-color: #7289da;
    cursor: pointer;
    border-radius: 50%;
    border: 5px solid #e3e5e8;
    color: #ffffff;
    font-size: 20px;
}
.button-container {
    display: flex;
    justify-content: space-between;
    background-color: #f6f6f7;
    width: 100%;
}
.inputs-container {
    display: flex;
    margin-bottom: 60px;
}
.altered-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.delete-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    background-color: #7289da;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 20px 40px;
    background-color: #f04747;
}
</style>
