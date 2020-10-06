<template lang="html">
    <div class="profile" v-if='user'>
        <div class="profile-image-container">
            <img class='profile-image' :src="user.image" :alt="user.username">
        </div>
        <span class='profile-username'>{{ user.username }}</span>
        <ProfileSettings></ProfileSettings>
    </div>
</template>

<script>
import ProfileSettings from './ProfileSettings'

export default {
    components: {
        ProfileSettings
    },
    computed: {
        user(){
            return this.$store.state.authentication.user
        }
    }
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
</style>
