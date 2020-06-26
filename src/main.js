import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() //$bus可变

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
