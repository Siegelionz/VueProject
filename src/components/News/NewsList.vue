<template>
    <div class="tmpl">
      <new-nav title="新闻列表"></new-nav>
      <div class="demo">
      <ul>
            <li v-for="content in news" :key="content.id">
                <router-link :to="{name:'newsdetail',query:{id:content.id}}">
                    <img class="" :src="content.img_url">
                    <div >
                        <span>{{content.title | filterText}}</span>
                        <div class="news-desc">
                            <p>点击数:{{content.click}}</p>
                            <p>发表时间:{{content.add_time | filterTime}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
            <li class="line"></li>
        </ul>
    </div>

    </div>
</template>
<script>
    export default {
        created(){
            //发起ajax请求
            this.$axios.get('getnewslist')
            .then(res=>{
                // console.log(res.data.message);
                this.news = res.data.message;
                // console.log(this.news);

            })
            .catch(err=>{
                console.log(err);
            })
        },
        data(){
            return {
                news:[]
            }
        }
    }
</script>
<style scoped>
.demo a {
    display: block;
    width: 330px;
    height: 44px;
    color: #000;
    padding: 10px 15px;
}
.demo img {
    float: left;
    width: 42px;
    height: 42px;
    margin-right: 20px;
}
.demo a div {
    float: left;
    width: 238px;
    margin-right: 20px;
}
.demo span {
    display: block;
    width: 100%;
    font-size: 17px;
    line-height: 21px;
}
.demo a p {
    float: left;
    color: #0bb0f5;
    font-size: 14px;
    line-height: 21px;
}
.demo p:nth-child(2) {
    float: right;
}
.page-title{
    margin-left: 25%;
}
.line {
    margin-left: 16px;
    transform: scaleY(.5);
    border-bottom: 1px solid #c8c7cc;
}




</style>