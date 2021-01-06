import Vue from 'vue'
import ElementUI from 'element-ui'
import ViewUI from 'view-design'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'
import 'element-ui/lib/theme-chalk/index.css'
import request from './utils/request'

Vue.config.productionTip = false

// 引入组件
Vue.use(ElementUI)
Vue.use(ViewUI)

Vue.prototype.$request = request


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
