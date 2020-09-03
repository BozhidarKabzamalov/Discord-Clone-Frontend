<template lang="html">
    <div class="members">
        <div class="member" v-for='member in server.users'>
            <div class="member-image-container">
                <img class='member-image' :src="member.image" alt="">
                <div class='online-indicator' v-if='isUserOnline(member)'></div>
                <div class='offline-indicator' v-else></div>
            </div>
            <span class='member-username'>{{ member.username }}</span>
            <i class="crown fas fa-crown" v-if='server.userId == member.id'></i>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'server'
    ],
    methods: {
        isUserOnline(member){
            return this.server.onlineUsers.includes(member.username)
        }
    }
}
</script>

<style lang="css" scoped>
.members {
    width: 239px;
    background-color: #2f3136;
}
.member {
    display: flex;
    align-items: center;
    padding: 30px 20px 0 20px;
}
.member-image-container {
    position: relative;
    margin-right: 10px;
}
.member-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
.member-username {
    font-weight: 500;
    color: #8e9297;
    margin-right: 10px;
}
.crown {
    color: #faa61a;
}
.online-indicator,
.offline-indicator
{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
}
.online-indicator {
    background-color: #43b581;
}
.offline-indicator {
    background-color: #747f8d;
}
</style>
