<template lang="html">
    <div class="users">
        <p class='user' v-for='user in users'>{{ user }}</p>
    </div>
</template>

<script>
export default {
    props: ['users']
}
</script>

<style lang="css" scoped>
.users {
    width: 239px;
    background-color: #2f3136;
    padding: 15px;
}
.user {
    margin-bottom: 10px;
}
</style>
