<template lang="html">
    <div class="image-cropper">
        <div class="cropper-container">
            <cropper v-if='originalImage' :src="originalImage" @change="onChange" :stencil-props="{ aspectRatio: 1 }" />
        </div>
        <div class="image-cropper-footer">
            <div class='crop' @click='closeCropper()'>Apply</div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'originalImage'
    ],
    data(){
        return {
            croppedImage: null,
            coordinates: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            }
        }
    },
    methods: {
        onChange({ coordinates, canvas, }){
			this.coordinates = coordinates;
            canvas.toBlob(blob => {
                this.croppedImage = blob
            });
		},
        closeCropper(){
            this.$emit('closeCropper', this.croppedImage);
        }
    }
}
</script>

<style lang="css" scoped>
.image-cropper {
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
.image-cropper-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #2f3136;
    width: 100%;
    height: 65px;
}
.crop {
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
</style>
