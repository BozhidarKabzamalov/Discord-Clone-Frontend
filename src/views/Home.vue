<template>
    <div class="home">
        <Navigation></Navigation>
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from '../components/Navigation'

export default {
    components: {
        Navigation
    }
}
</script>

<style scoped>
.home {
    display: flex;
    min-width: 100vw;
    min-height: 100vh;
}
</style>
