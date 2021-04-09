import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/CSS/global.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/fonts/iconfont.css'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$store = store

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
