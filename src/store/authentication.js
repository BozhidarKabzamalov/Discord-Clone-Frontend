import router from '../router'
import axios from 'axios'

const authentication = {
    state: {
        user: null
    },
    mutations: {
        setUser(state, user){
            state.user = user
            localStorage.setItem('userId', user.id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('userImage', user.image);
            localStorage.setItem('token', user.token);
        },
        removeUser(state){
            state.user = null
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
            localStorage.removeItem('userImage')
            localStorage.removeItem('token')
        }
    },
    actions: {
        async register({commit, dispatch}, userInfo){
            try {
                let response = await axios.post('/register', userInfo)

                if (response.status == 401) {
                    console.log('Error')
                } else {
                    router.replace('/login')
                }
            } catch (error) {
                console.log(error)
            }
        },
        async login({commit, dispatch}, userInfo){
            try {
                let response = await axios.post('/login', userInfo)

                if (response.status == 401) {
                    console.log('Error')
                } else {
                    commit('setUser', response.data.user)
                    axios.interceptors.request.use(function (config) {
                        config.headers.Authorization = 'Bearer ' + response.data.user.token

                        return config
                    });
                    dispatch('getUserServers', response.data.user.id)
                    router.replace('/')
                }
            } catch (error) {
                console.log(error)
            }
        },
        autoLogin({commit, dispatch}){
            const userId = localStorage.getItem('userId')
            const username = localStorage.getItem('username')
            const userImage = localStorage.getItem('userImage')
            const token = localStorage.getItem('token')

            if (!token) {
                return
            }

            let user = {
                id: userId,
                username: username,
                image: userImage,
                token: token
            }

            commit('setUser', user)

            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + token

                return config
            });

            dispatch('getUserServers', userId)
        },
        logout({commit}){
            commit('removeUser')
            router.replace('/login')
        }
    }
}

export default authentication
