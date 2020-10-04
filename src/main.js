import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.validateStatus = function() {
  return true;
};

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    store: store
}).$mount('#app')
