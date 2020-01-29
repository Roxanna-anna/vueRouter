import Vue from 'vue'
import App from './App.vue'
import router from './anRouter/routerIndex'
// import router from './router'
import store from './store'
import HelloWorld from './components/HelloWorld.vue'

Vue.config.productionTip = false

//   *************************************
// 1.全局混入
// 2.单元测试 extend

var test = {
  testa: 1
}
function a () {
  console.log('in')
}
setTimeout(function () {
  test.testa = 44444
}, 4000)
a.install = function (vue) {
  // 全局混入VUE实例
  console.log(vue.util.defineReactive)
  vue.util.defineReactive(test, 'testa')
  // 2 Vue.extend 扩展vue,会返回VUE文件的构造类
  const Constructor = Vue.extend(HelloWorld)
  const vm = new Constructor().$mount()
  console.log(vm)

  console.log(vue.util.extend)
  console.log(vue.extend)

  vue.mixin({
    data () {
      return {
        c: 'this is mixin'
      }
    },
    beforeCreate () {
      this.test = test// 将test 注入
    },
    methods: {

    }
  })
}
Vue.use(a)
//    *************************************
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
