import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
import ElementUI from 'element-ui'
import $ from 'jquery'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false

// 引入组件
Vue.use(ViewUI)
Vue.use(ElementUI)

Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 6000

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
