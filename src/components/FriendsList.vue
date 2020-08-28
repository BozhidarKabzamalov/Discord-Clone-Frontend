<template lang="html">
    <div class="friends-list">
        <div class="messages">

        </div>
        <div class="friends">
            <div class="friends-header">
                <h1><i class="fas fa-user-friends"></i>Friends</h1>
                <p :class='{ active: selectedTab == 0 }' @click='selectedTab = 0'>Online</p>
                <p :class='{ active: selectedTab == 1 }' @click='selectedTab = 1'>Pending</p>
                <p :class='{ active: selectedTab == 2 }' @click='selectedTab = 2'>All</p>
            </div>

            <div class="accepted-friends" v-if='selectedTab == 0'>
                <div class='friend' v-for='friend in acceptedFriends'>
                    <div class="friend-image-container">
                        <img class='responsive-image' :src="friend.user.image" alt="">
                    </div>

                    <p class='friend-username'>{{ friend.user.username }}</p>
                </div>
            </div>

            <div class="pending-friends" v-if='selectedTab == 1'>
                <div class='friend' v-for='friend in pendingFriends'>
                    <div class="friend-image-container">
                        <img class='responsive-image' :src="friend.user.image" alt="">
                    </div>

                    <p class='friend-username'>{{ friend.user.username }}</p>
                </div>
            </div>

            <div class="accepted-friends" v-if='selectedTab == 2'>
                <div class='friend' v-for='friend in friends'>
                    <div class="friend-image-container">
                        <img class='responsive-image' :src="friend.user.image" alt="">
                    </div>

                    <p class='friend-username'>{{ friend.user.username }}</p>
                </div>
            </div>

        </div>
        <div class="placeholder">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selectedTab: 0
        }
    },
    computed: {
        friends(){
            return this.$store.state.friends
        },
        acceptedFriends(){
            return this.friends.filter(friend => {
                return friend.accepted == true
            })
        },
        pendingFriends(){
            return this.friends.filter(friend => {
                return friend.accepted == false
            })
        }
    },
    mounted(){
        this.$store.commit('setSelectedServer', null)
    }
}
</script>

<style lang="css" scoped>
.friends-list {
    display: flex;
    flex: 1;
}
.messages {
    width: 240px;
    background-color: #2f3136;
}
.friends {
    flex: 1;
    background-color: #36393f;
}
.accepted-friends,
.pending-friends {
    padding: 20px;
}
.friend {
    display: flex;
    align-items: center;
    padding: 12px 0px 17px 0px;
    border-top: 1px solid #42454a;
}
.friend-username {
    color: #ffffff;
    font-weight: 700;
    margin-left: 20px;
}
.friend-image-container {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
}
.placeholder {
    width: 239px;
    background-color: #2f3136;
}
.friends-header {
    display: flex;
    align-items: center;
    color: #ffffff;
    padding: 10px 20px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}
.friends-header > h1 {
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    margin-right: 20px;
}
.friends-header > p {
    font-size: 16px;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 20px;
}
.friends-header > p:hover {
    background-color: #3e4249;
}
.active {
    background-color: #3e4249;
}
.fa-user-friends {
    margin-right: 10px;
}
</style>
