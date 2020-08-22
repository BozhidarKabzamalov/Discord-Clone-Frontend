<template lang="html">
    <div class="friends-list">
        <div class="messages">

        </div>
        <div class="friends">
            <div v-for='friend in friends' class="friend">
                {{ friend.user.username }}
            </div>
        </div>
        <div class="placeholder">

        </div>
    </div>
</template>

<script>
export default {
    computed: {
        friends(){
            return this.$store.state.friends
        }
    },
    mounted(){
        this.$store.state.selectedServer = null
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
.placeholder {
    width: 239px;
    background-color: #2f3136;
}
</style>
