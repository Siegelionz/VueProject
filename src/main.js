//vue  start
import Vue from 'vue';

// 引入组件 start
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Vip from './components/Vip/Vip.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Find from './components/Find/Find.vue';
//vue-router  start

//引入组件并全局注册
import MyUl from './components/slot/MyUl.vue';
import MyLi from './components/slot/MyLi.vue';
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);

//引入vue-router
import VueRouter from 'vue-router';
//安装插件
Vue.use(VueRouter);
//创建路由
let router = new VueRouter();
//配置路由规则
router.addRoutes([
    { name:'home',path:'/home',component:Home },
    { name:'vip',path:'/vip',component:Vip },
    { name:'shopcart',path:'/shopcart',component:Shopcart },
    { name:'find',path:'/find',component:Find }
])

//vue-router end

//mint-ui start

//引入mint-ui
import MintUi from 'mint-ui';
//引入css样式
import 'mint-ui/lib/style.css';
//安装插件
Vue.use(MintUi);

//引入css文件
import './static/css/global.css'

//mint-ui end

//axios  start

//引入axios
import Axios from 'axios';
//给Vue原型对象挂载axios
Vue.prototype.$axios = Axios;
//设置一下baseURL
Axios.defaults.baseURL = 'http://vue.studyit.io/api/'

//axios end

new Vue({
    el:'#app',
    render:c=>c(App),
    router
})

//vue end
