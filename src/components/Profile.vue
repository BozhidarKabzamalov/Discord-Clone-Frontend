<template lang="html">
    <div class="profile">
        <div class="profile-image-container">
            <img class='profile-image' src="https://media.discordapp.net/attachments/733747075455647898/738360317209214976/1.png" alt="">
        </div>
        <span class='profile-username'>{{ this.$store.state.username }}</span>
        <i class="logout fas fa-sign-out-alt" @click='logout()'></i>
    </div>
</template>

<script>
export default {
    methods: {
        logout(){
            this.$store.dispatch('logout')
        }
    },
}
</script>

<style lang="css" scoped>
.profile {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #292b2f;
}
.profile-image-container {
    position: relative;
    margin-right: 10px;
}
.profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
.profile-username {
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
    margin-right: 10px;
    font-size: 14px;
}
.logout {
    color: #8e9297;
    margin-left: auto;
    cursor: pointer;
}
.logout:hover {
    color: #dbdcdd;
}
</style>
