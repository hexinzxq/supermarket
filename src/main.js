import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// 引入toast插件
import toast from 'components/commen/toast'

Vue.config.productionTip = false
// 为Vue的原型增加$bus，将Vue当做事件总线
Vue.prototype.$bus=new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用图片懒加载的插件,可以同时传入一个options对象，放入图片作为占位图
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
