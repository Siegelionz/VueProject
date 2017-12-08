<template>
    <div>
        <new-nav title='商品详情'></new-nav>
        <go-back-header title="商品详情"></go-back-header>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swipe :url="swipeid"></my-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{goodsdetail.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{goodsdetail.sell_price}}</s> 销售价：<span>￥{{goodsdetail.market_price}}</span></li>
                <li class="number-li">购买数量：<span @click="subtractnum">-</span><span>{{num}}</span><span @click="addnum">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <!-- 当点击立即购买触发函数 -->
                    <mt-button type="danger" @click="addShopCart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
            <!-- 要实现过渡效果的小球 -->
            <transition name="myball"  @after-enter="afterEnter">
                <div class="ball" v-if="show"></div>
            </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{goodsdetail.goods_no}}</li>
                <li>库存情况：{{goodsdetail.stock_quantity}}件</li>
                <li>上架时间：{{goodsdetail.add_time | filterTime}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
//引入模板
import obj from '../slot/getBall';
    export default {
        methods:{
            addShopCart(){
                //当点击立即购买，让小球显示出来
                // 添加到storage为当前商品的id和加入购物车
                this.show = true;
                obj.setBallNum({
                    id:this.$route.query.id,
                    num:this.num
                })
            
            },
            afterEnter(){
                //当动画完成后  移除小球
                this.show = false;
            },
            addnum(){
                this.num++;
            },
            subtractnum(){
                this.num--;
            }
        },
        created(){
            this.goodsid = this.$route.query.id;
            this.swipeid = 'getthumimages/'+ this.goodsid
            //发起ajax请求
            this.$axios.get('/goods/getinfo/'+this.goodsid)
            .then(res=>{
                this.goodsdetail = res.data.message[0];
            })
            .catch(err=>{
                console.log(err);
            })
        },
        data(){
            return{
                goodsid:'',
                goodsdetail:{},
                swipeid:'',
                //默认为移除状态
                show:false,
                num:1
            }
        }
    }
</script>
<style scoped>
.myball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 476px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
