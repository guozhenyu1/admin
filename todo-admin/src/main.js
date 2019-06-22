import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import '//at.alicdn.com/t/font_1255660_gpit417t2vw.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
