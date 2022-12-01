import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'

Vue.use(VueGlide)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(VueMoment)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
