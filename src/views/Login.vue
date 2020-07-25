<template lang="html">
    <div class="register">
        <div class="register-container">
            <p>Welcome back!</p>
            <form @submit.prevent="onSubmit" novalidate>
                <div class="margin-bottom-20">
                    <p>Email</p>
                    <input v-model='email' type='email'>
                </div>
                <div class="margin-bottom-20">
                    <p>Password</p>
                    <input v-model='password' type="password">
                </div>
                <button type="submit" name="button">Continue</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        onSubmit(){
            let userInfo = {
                password: this.password,
                email: this.email
            }
            this.$store.dispatch('login', userInfo)
        }
    }
}
</script>

<style lang="css" scoped>
.register {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.register-container {
    background-color: #36393f;
    width: 500px;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);
}
.register-container > p {
    text-align: center;
    font-weight: 600;
    color: #ffffff;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 20px;
}
.margin-bottom-20 {
    margin-bottom: 20px;
}
.margin-bottom-20 > p {
    color: #8e9297;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    text-transform: uppercase;
}
input {
    font-size: 16px;
    width: 100%;
    height: 40px;
    padding: 10px;
    color: #dcddde;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 3px;
}
input:hover {
    border: 1px solid rgba(0, 0, 0, 0.5);
}
input:focus {
    outline: 1px solid #7289da;
}
button {
    cursor: pointer;
    font-weight: 500;
    color: #ffffff;
    background-color: #7289da;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    height: 40px;
    border-radius: 3px;
    outline: none;
    border: none;
}
button:hover {
    background-color: #677bc4;
}
</style>
