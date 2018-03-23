import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import './assets/styles/ajinit.css';

import router from './routers.js';
import i18n from './langs';

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(iView);

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
