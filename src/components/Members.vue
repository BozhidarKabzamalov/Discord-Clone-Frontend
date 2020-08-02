<template lang="html">
    <div class="members" v-if='servers'>
        <p class="member" v-for='user in servers[selectedServer].users'>
            <img class='image' :src="user.image" alt="">
            <span class='username'>{{ user.username }}</span>
            <i class="crown fas fa-crown" v-if='servers[selectedServer].userId == user.id'></i>
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        servers(){
            return this.$store.state.servers
        },
        selectedServer(){
            return this.$store.state.selectedServer
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
.username {
    font-weight: 500;
    color: #8e9297;
    margin-right: 10px;
}
.crown {
    color: #faa61a;
}
.image {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    border-radius: 50%;
}
</style>
