<template lang="html">
    <div>
        <div class='create-join-server' v-if='selectedAction == null'>
            <h1>Oh, another server!</h1>
            <div class="buttons-container">
                <div class="create-server" @click='setSelectedAction(0)'>Create Server</div>
                <div class="join-server" @click='setSelectedAction(1)'>Join Server</div>
            </div>
        </div>
        <ServerCreate v-if="selectedAction == 0" @closeModal='closeModal'></ServerCreate>
        <ServerJoin v-if="selectedAction == 1" @closeModal='closeModal'></ServerJoin>
    </div>
</template>

<script>
import ServerCreate from './ServerCreate'
import ServerJoin from './ServerJoin'

export default {
    props: [
        'selectedAction'
    ],
    components: {
        ServerCreate,
        ServerJoin
    },
    methods: {
        setSelectedAction(action){
            this.$emit('setSelectedAction', action);
        },
        closeModal(){
            this.$emit('closeModal')
        }
    }
}
</script>

<style lang="css" scoped>
.create-join-server {
    width: 540px;
    padding: 40px;
    border-radius: 3px;
}
.create-join-server > h1 {
    font-weight: 700;
    font-size: 25px;
    text-align: center;
    margin-bottom: 40px;
    color: rgba(0, 0, 0, 0.8);
}
.buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.create-server,
.join-server {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    width: 200px;
    height: 40px;
    border-radius: 3px;
    cursor: pointer;
}
.create-server {
    margin-right: 10px;
    background-color: #7289da;
}
.create-server:hover {
    background-color: #677bc4;
}
.join-server {
    margin-left: 10px;
    background-color: #43b581;
}
.join-server:hover {
    background-color: #3ca374;
}
</style>
