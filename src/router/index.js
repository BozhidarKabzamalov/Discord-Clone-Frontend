import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter(to, from, next){
            if (localStorage.getItem('token') != null) {
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
