<template lang="html">
    <div class='server-create'>
        <form class="create-server-form" @submit='createServer($event)'>
            <h1>Create your own server</h1>
            <p>Make a place for you to hang out with your friends.</p>
            <div class="inputs-container">
                <div class="input-container">
                    <label class='text-input-label' :for="serverName">server name</label>
                    <input type="text" v-model="serverName" placeholder="Enter a server name">
                </div>
                <div class="input-container">
                    <label class="file-input-label" for="file-upload">
                        <img class='altered-image' v-if='croppedImage' :src="croppedImageUrl">
                        <i class="fas fa-cloud-upload-alt" v-else></i>
                    </label>
                    <input id='file-upload' type="file" name="image" @change="handleFileUpload($event)">
                </div>
            </div>
            <div class="button-container">
                <div class='go-back-button' @click="$emit('goBack')">Back</div>
                <button class='create-server-button' type="submit" name="button">Create</button>
            </div>
        </form>
        <ImageCropper v-if='imageCropperWindow' :originalImage='originalImage' @closeCropper='closeCropper'></ImageCropper>
    </div>
</template>

<script>
import axios from 'axios'
import { Cropper } from 'vue-advanced-cropper'
import ImageCropper from './ImageCropper'

export default {
    components: {
        Cropper,
        ImageCropper
    },
    data(){
        return {
            serverName: '',
            originalImage: '',
            croppedImage: null,
            imageCropperWindow: false
        }
    },
    methods: {
        closeCropper(croppedImage){
            this.croppedImage = croppedImage
            this.imageCropperWindow = false
        },
        handleFileUpload(event){
            this.originalImage = URL.createObjectURL(event.target.files[0])
            this.imageCropperWindow = true
        },
        async createServer(event){
            event.preventDefault()

            let server = new FormData()
            server.append('name', this.serverName)
            server.append('image', this.croppedImage)

            try {
                let response = await axios.post('/createServer', server)

                this.createServerWindow = false;
                this.$store.commit('addServer', response.data)
                this.$store.dispatch('joinServer', response.data)
                this.$emit('closeModal')
            } catch (error) {
                console.log(error)
            }

        }
    },
    computed: {
        croppedImageUrl(){
            return URL.createObjectURL(this.croppedImage)
        }
    }
}
</script>

<style lang="css" scoped>
.server-create {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
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
    padding: 40px 0 0 0;
}
.create-server-button, .go-back-button {
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
.create-server-button {
    background-color: #7289da;
}
.go-back-button {
    color: rgba(0, 0, 0, 0.8);
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
.text-input-label {
    font-size: 13px;
    font-weight: 700;
    color: #4f5660;
    text-transform: uppercase;
}
.create-server-form input {
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
</style>
