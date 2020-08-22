import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Server from '../components/Server.vue'
import FriendsList from '../components/FriendsList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/',
                name: 'friendsList',
                component: FriendsList
            },
            {
                path: '/server/:endpoint',
                name: 'server',
                component: Server,
            }
        ],
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
        component: Register,
        beforeEnter(to, from, next){
            if (localStorage.getItem('token') === null) {
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next){
            if (localStorage.getItem('token') === null) {
                next()
            } else {
                next('/')
            }
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
