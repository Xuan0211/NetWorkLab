// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'  
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/global.css'
import store from './store/index'
import VueSocketIO from 'vue-socket.io'

Vue.use(ElementUI).use(
  new VueSocketIO({
    debug: false, // debug调试，生产建议关闭
    connection: "http://localhost:3000",
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
    options: {     //Optional options, 
      autoConnect:false, //关闭自动连接，在用户登录后在连接。
    } 
  })
);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
