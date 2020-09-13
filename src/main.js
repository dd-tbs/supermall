import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//给Vue的原型添加事件总线,用来监听GoodsListItem的图片加载完成在Home.Vue中执行
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
