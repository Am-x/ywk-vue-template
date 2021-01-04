import Vue from 'vue'
import ViewUI from 'view-design'
import ElementUI from 'element-ui'
import $ from 'jquery'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'
import 'element-ui/lib/theme-chalk/index.css'
import request from '@/utils/request'

Vue.config.productionTip = false

// 引入组件
Vue.use(ViewUI)
Vue.use(ElementUI)

Vue.prototype.$request = request

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
