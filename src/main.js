import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.validateStatus = function() {
  return true;
};
axios.interceptors.request.use(function (config) {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJib2ppZGFyX3Nfa0BhYnYuYmciLCJpYXQiOjE1OTU4NTA0MTF9.WpZaUENI6Zy-W6DGguEzF7GcKAC3hDLrOfFHcmJQj0I'
    config.headers.Authorization = 'Bearer ' + token

    return config
});

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    store: store
}).$mount('#app')
