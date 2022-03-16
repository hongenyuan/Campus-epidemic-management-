import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'
import moment from 'moment'//日期格式转换器
// import VCharts from 'v-charts'
import VeLine from 'v-charts/lib/line'
Vue.config.productionTip = false;
Vue.component(VeLine.name, VeLine)
// Vue.use(VCharts)
Vue.use(Element)
Vue.prototype.axios = axios
Vue.prototype.request=axios.prototype.request
Vue.prototype.moment=moment
// 设置请求拦截器
axios.interceptors.request.use(config => {
  if (config.url === 'http://localhost:8001/api/login') return config;
  if (config.url === 'http://localhost:8001/api/checkUserlogin') return config;
  if (config.url === 'http://localhost:8001/api/checkUser') return config;
  if (config.url === 'http://localhost:8001/api/register') return config;
  //为请求头对象，添加token 验证的Authorization字段
  config.headers.Authorization ='Bearer ' + window.localStorage.getItem('token')
  return config;
})



//添加全局的路由守卫
router.beforeEach((to, from, next)=> {
  if (to.meta.requireAuth) {
    if (JSON.parse(window.localStorage.getItem('isLogin'))) {
      next();
    } else {
      alert('请先登录！')
      next({
        path:'/login'
      })
    }
  }
  if (to.fullPath === '/login' || to.fullPath === '/' ) {
    if (JSON.parse(window.localStorage.getItem('isLogin'))){
      alert('你当前已登录！');
     router.go(-1)//返回上一页
    } else {
      next()
    }
  }
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
