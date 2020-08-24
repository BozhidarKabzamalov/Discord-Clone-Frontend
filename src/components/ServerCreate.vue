<template lang="html">
    <div class='server-create'>
        <i class="toggle-create-server fas fa-plus" @click='createServerWindow = true'></i>
        <div class='create-server-window' v-if='createServerWindow'>
            <div class="create-server-form-container">
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
                        <button type="submit" name="button">Create</button>
                    </div>
                </form>
                <div class="image-editor" v-if='imageEditorWindow'>
                    <div class="cropper-container">
                        <cropper :src="originalImage" @change="onChange" :stencil-props="{ aspectRatio: 1 }" />
                    </div>
                    <div class="image-editor-footer">
                        <div class='apply-edits' @click='imageEditorWindow = false'>Apply</div>
                    </div>
                </div>
                <div class="black-screen" @click='resetModal()'></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Cropper } from 'vue-advanced-cropper'

export default {
    components: {
        Cropper
    },
    data(){
        return {
            createServerWindow: false,
            serverName: '',
            originalImage: '',
            croppedImage: null,
            coordinates: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },
            imageEditorWindow: false
        }
    },
    methods: {
        resetModal(){
            this.createServerWindow = false
            this.serverName = '',
            this.originalImage = '',
            this.croppedImage = null,
            this.coordinates = {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },
            this.imageEditorWindow = false
        },
        onChange({ coordinates, canvas, }){
			this.coordinates = coordinates;
            canvas.toBlob(blob => {
                this.croppedImage = blob
            });
		},
        handleFileUpload(event){
            this.originalImage = URL.createObjectURL(event.target.files[0])
            this.imageEditorWindow = true
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
            } catch (error) {
                console.log(error)
            }

        }
    },
    computed: {
        croppedImageUrl(){
            return URL.createObjectURL(this.croppedImage)
        },
        index(){
            return this.$store.state.servers.length - 1
        },
        username(){
            return this.$store.state.username
        }
    }
}
</script>

<style lang="css" scoped>
.toggle-create-server {
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
.toggle-create-server:hover {
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
    padding: 40px 0 0 0;
}
.create-server-form button {
    width: 100px;
    height: 40px;
    background-color: #7289da;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 20px 40px;
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
.black-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
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
    justify-content: flex-end;
    background-color: #f6f6f7;
    width: 100%;
}
.inputs-container {
    display: flex;
    margin-bottom: 60px;
}
.image-editor {
    position: absolute;
    width: 600px;
    background-color: #36393f;
    z-index: 9999999;
    border-radius: 3px;
}
.cropper-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 550px;
    margin: 25px;
    background-color: #1c1d20;
    border-radius: 3px;
}
.image-editor-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #2f3136;
    width: 100%;
    height: 65px;
}
.apply-edits {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 67px;
    height: 32px;
    background-color: #7289da;
    color: #ffffff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin: 0 20px 0 0;
}
.altered-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>
