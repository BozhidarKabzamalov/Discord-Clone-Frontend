<template>
    <div class="home">
        <Servers></Servers>
        <Rooms></Rooms>
        <Chat></Chat>
        <Members></Members>
    </div>
</template>

<script>
import Servers from '../components/Servers'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'
import Members from '../components/Members'

export default {
    components: {
        Servers,
        Rooms,
        Chat,
        Members
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
