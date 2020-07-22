<template>
    <div class="home">
        <Servers></Servers>
        <Rooms></Rooms>
        <Chat></Chat>
        <Users></Users>
    </div>
</template>

<script>
import Servers from '../components/Servers'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'
import Users from '../components/Users'

export default {
    components: {
        Servers,
        Rooms,
        Chat,
        Users
    },
    created(){
        this.$store.dispatch('getUserServers', localStorage.userId)
    }
}
</script>

<style scoped>
.home {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
}
</style>
