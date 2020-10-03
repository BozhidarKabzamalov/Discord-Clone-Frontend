<template lang="html">
    <div class="profile-settings">
        <i class="toggle-profile-settings fas fa-cog" @click='openModal()'></i>
        <Modal v-if='isModalOpen' @closeModal='closeModal()'>
            <div class="profile-settings">
                <form class="profile-settings-form" @submit='updateUser($event)'>
                    <h1>Edit profile</h1>
                    <div class="inputs-container">
                        <div class="input-container">
                            <label class='text-input-label' :for="username">username</label>
                            <input type="text" v-model="username" placeholder="Enter a username">
                        </div>
                        <div class="input-container">
                            <label class="file-input-label" for="file-upload">
                                <img class='altered-image' v-if='croppedImage' :src="croppedImageUrl">
                                <img class='altered-image' v-else :src="userImage" :alt="username">
                            </label>
                            <input id='file-upload' type="file" name="image" @change="handleFileUpload($event)">
                        </div>
                    </div>
                    <div class="button-container">
                        <p class="logout" @click='logout()'>Log Out</p>
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
    data(){
        return {
            userId: this.$store.state.userId,
            username: this.$store.state.username,
            userImage: this.$store.state.userImage,
            isModalOpen: false,
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
            this.coordinates = {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },
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
        async updateUser(){
            event.preventDefault()

            let data = new FormData()
            data.append('userId', this.userId)
            data.append('username', this.username)
            data.append('image', this.croppedImage)

            try {
                let response = await axios.post('/updateUser', data)

                this.closeModal()
            } catch (error) {
                console.log(error)
            }
        },
        logout(){
            this.$store.dispatch('logout')
        }
    },
    computed: {
        croppedImageUrl(){
            return URL.createObjectURL(this.croppedImage)
        }
    },
}
</script>

<style lang="css" scoped>
.toggle-profile-settings {
    cursor: pointer;
    color: #b9bbbe;
}
.profile-settings {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
}
.profile-settings-form {
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
.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 20px 0 20px;
}
.profile-settings-form h1 {
    font-weight: 700;
    font-size: 20px;
    color: #7289da;
    margin-bottom: 20px;
    text-transform: uppercase;
}
.text-input-label {
    font-size: 13px;
    font-weight: 700;
    color: #4f5660;
    text-transform: uppercase;
}
.profile-settings-form input {
    color: #2f3136;
    font-size: 16px;
    padding: 12px 4px;
    border: none;
    border-bottom: 2px solid #e3e5e8;
    outline: none;
}
.inputs-container {
    display: flex;
    margin-bottom: 60px;
}
.button-container {
    display: flex;
    justify-content: space-between;
    background-color: #f6f6f7;
    width: 100%;
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
.altered-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.logout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 20px 40px;
    color: rgba(0, 0, 0, 0.8);
}
</style>
