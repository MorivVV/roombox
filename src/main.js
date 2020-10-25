import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.css'


Vue.config.productionTip = false

new Vue({
    router,
    store,
    mounted() {
        document.addEventListener('DOMContentLoaded', function() {
            M.AutoInit()
        })
    },
    render: h => h(App)
}).$mount('#app')