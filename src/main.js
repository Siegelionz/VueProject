//vue  start
import Vue from 'vue';
import Moment from 'moment';

// 引入组件 start
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Vip from './components/Vip/Vip.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Find from './components/Find/Find.vue';
import NewsList from './components/News/NewsList.vue';
import NewsDetail from './components/News/NewsDetail.vue';
import PhotoList from './components/Photo/PhotoList.vue';
import PhotoDetail from './components/Photo/PhotoDetail.vue';
//vue-router  start

//引入组件并全局注册
import MyUl from './components/slot/MyUl.vue';
import MyLi from './components/slot/MyLi.vue';
import MyNav from './components/slot/Nav.vue';
Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);
Vue.component(MyNav.name,MyNav)

//注册过滤器
Vue.filter('filterTime',function(value){
    return Moment(value).format('YYYY-MM-DD');
})
Vue.filter('filterText',function(value){
    return value.substr(0,14)+'..';
})

//引入vue-router
import VueRouter from 'vue-router';
//安装插件
Vue.use(VueRouter);
//创建路由
let router = new VueRouter();
//配置路由规则
router.addRoutes([
    { path:'/',component:Home },   //重定向
    { name:'home',path:'/home',component:Home },//主页组件
    { name:'vip',path:'/vip',component:Vip },//会员组件
    { name:'shopcart',path:'/shopcart',component:Shopcart },//购物车组件
    { name:'find',path:'/find',component:Find },//查找组件
    { name:'newslist',path:'/newslist',component:NewsList },//新闻列表组件
    { name:'newsdetail',path:'/newsdetail',component:NewsDetail },//新闻详情组件
    { name:'photolist',path:'/photolist/:listid',component:PhotoList },//图文列表组件
    { name:'photodetail',path:'/photodetail/:detailid',component:PhotoDetail }//图文详情列表
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

//引入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

new Vue({
    el:'#app',
    render:c=>c(App),
    router
})

//vue end
