<template lang="html">
    <div class="members">
        <p class="member" v-for='member in members'>
            <img class='image' :src="member.image" alt="">
            <span class='username'>{{ member.username }}</span>
            <i class="crown fas fa-crown" v-if='server.userId == member.id'></i>
        </p>
    </div>
</template>

<script>
export default {
    props: [
        'server',
        'members'
    ]
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
.image {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    border-radius: 50%;
}
.username {
    font-weight: 500;
    color: #8e9297;
    margin-right: 10px;
}
.crown {
    color: #faa61a;
}
</style>
