<template>
<div class="modal">
    <div class="slot-container">
        <slot></slot>
    </div>
    <div class="black-screen" @click='closeModal()'></div>
</div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit('closeModal');
        }
    }
}
</script>

<style>
.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.slot-container {
    background-color: #ffffff;
    z-index: 1;
}
.black-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
