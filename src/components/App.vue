<template>
    <div>
        <mt-header  title="信息管理系统"></mt-header>
        <router-view></router-view>
        <mt-tabbar v-model="selected">
        <mt-tab-item id="home">
            <img slot="icon" src="../static/img/index.png">
            主页
        </mt-tab-item>
        <mt-tab-item id="vip">
            <img slot="icon" src="../static/img/vip.png">
            会员
        </mt-tab-item>
        <mt-tab-item id="shopcart">
            <img slot="icon" src="../static/img/shopcart.png">
            购物车
        </mt-tab-item>
        <mt-tab-item id="find">
            <img slot="icon" src="../static/img/find.png">
            查找
        </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
export default {
  data() {
    return {
        selected:''
    };
  },
  watch:{
      'selected':function(newV){
        //监视selected值
        switch(newV){
            case 'home':
            this.$router.push({ name:'home' })
            break;
            case 'vip':
            this.$router.push({ name:'vip' })
            break;
            case 'shopcart':
            this.$router.push({ name:'shopcart' })
            break;
            case 'find':
            this.$router.push({ name:'find' })
            break;
        }
      }
  }
};
</script>
<style scoped>

</style>

