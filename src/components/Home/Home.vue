<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(ele,index) in swipes" :key="index">
                <a :href="ele.url">
                    <img :src="ele.img" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <!-- 九宫格 -->
        <my-ul>
            <my-li v-for="(ele,index) in nav" :key="index">
                <a href="javascript:;">
                    <div :class="'back-img '+ ele.pic">
                        {{ele.txt}} 
                    </div>
                </a>
            </my-li>
        </my-ul>
    </div>
</template>
<script>
    export default {
        //所用created
        created(){
            this.$axios.get('getlunbo')
                .then( res=>{
                    this.swipes = res.data.message;
                } ) 
        },
        data(){
            return {
                swipes:'',
                nav:[
                    { txt:'新闻列表',pic:'news' },
                    { txt:'图文分享',pic:'pic' },
                    { txt:'商品列表',pic:'goods' },
                    { txt:'留言反馈',pic:'feedback' },
                    { txt:'搜索资讯',pic:'search' },
                    { txt:'联系我们',pic:'callme' }
                ]
            }
        }
    }
</script>
<style scoped>
    .mint-swipe{
        height:222px;
    }
    .mint-swipe-item img{
        width: 100%;
    }
    .back-img{
        background-size: 50px;
        background-repeat: no-repeat;
        background-position: 40px 35px;
        font-size: 20px;
        font-family: 'Microsoft YaHei';
    }
    li a{
        color:black;
    }
    .news{
        background-image: url('../../static/img/news.png');
    }
    .pic {
        background-image: url('../../static/img/picShare.png');
    }
    .goods{
        background-image: url('../../static/img/goodShow.png');
    }
    .feedback{
        background-image: url('../../static/img/feedback.png');
    }
    .search{
        background-image: url('../../static/img/search.png');
    }
    .callme{
        background-image: url('../../static/img/callme.png');
    }
</style>

