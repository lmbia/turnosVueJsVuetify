import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import animate from 'animate.css'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  animate,
  render: h => h(App)
}).$mount('#app')
