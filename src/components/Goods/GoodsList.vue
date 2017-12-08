<template>
    <div style="height:667px">
        <new-nav title="商品列表"></new-nav>
        <mt-loadmore  :bottom-method="loadBottom" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded" ref="loadmore">
        <!-- bottom-method为当我们向上拉刷新的时候触发一个函数 -->
        <!-- bottom-all-loaded值为布尔值 默认false 当为ture的时候不在触发bottom-method函数 -->
        <ul>
            <li v-for="val in goods" :key="val.id">
                <router-link :to="{name:'goodsdetail',query:{id:val.id}}">
                    <img :src="val.img_url">
                    <div class="title">{{val.title | filterText(25)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>{{val.sell_price}}</span>
                            <s>{{val.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                {{val.stock_quantity}}
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
          
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    export default {
        methods:{
            loadBottom(){
                //此时是上拉触发函数 代表要更多的数据 发起ajax请求
                this.$axios.get('getgoods?pageindex='+this.pageindex)
                .then(res=>{
                    //先判断一下是否拿到返回的数据
                    if(res.data.message.length == 0){
                        //等于0  没有数据可获取
                        //提示没有数据了
                        this.$toast({
                            message: '没有更多的数据啦~~~',
                            duration: 2222
                        });
                        //关闭bottom-method函数
                        this.allLoaded = true;
                        //符合条件 不让下面的执行  
                        // return
                    }
                    //追加商品内容
                    this.goods = this.goods.concat(res.data.message);
                    //让页数自增
                    this.pageindex++;
                    //告诉组件 我做完了
                    this.$refs.loadmore.onBottomLoaded();
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        },
        data(){
            return {
                goods:[],
                pageindex:1,
                isAutoFill:false,
                allLoaded:false  //当我们上拉的时候再也拿不到数据了 停止触发bottomMethod函数
            }
        },
        created(){
            //发起ajax请求
            this.$axios.get('getgoods?pageindex='+this.pageindex)
            .then(res=>{
                this.goods = res.data.message;
                this.pageindex++;
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
</script>
<style scoped>

ul {
    overflow: hidden;
}
li {
    width: 50%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
}


li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;


}

li > a:not(.mui-btn) img {
     width: 100%;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

img {
    height: 200px;
}
</style>
