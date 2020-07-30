<template lang="html">
    <div class="create-room">
        <div class='room' v-if='servers && userId == servers[selectedServer].userId' @click='createRoom()'>Add Room</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    methods: {
        createRoom(){
            let room = {
                name: 'Test room',
                serverId: this.servers[this.selectedServer].id
            }

            axios.post('/createRoom', room)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        servers(){
            return this.$store.state.servers
        },
        selectedServer(){
            return this.$store.state.selectedServer
        },
        userId(){
            return this.$store.state.userId
        }
    }
}
</script>

<style lang="css" scoped>
.room {
    display: flex;
    align-items: center;
    padding: 20px;
    color: #ffffff;
    cursor: pointer;
}
.room:hover {
    background-color: #34373c;
}
</style>
