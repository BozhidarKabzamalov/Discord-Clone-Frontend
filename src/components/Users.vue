<template lang="html">
    <div class="users">
        <p :class="[{ 'owner': servers[selectedServer].userId == user.id}, 'user']" v-for='user in servers[selectedServer].users'>{{ user.username }}</p>
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
.users {
    width: 239px;
    background-color: #2f3136;
}
.user {
    font-weight: 500;
    color: #8e9297;
    padding: 30px 20px 0 20px;
}
.owner::after {
    content: " - Owner"
}
</style>
