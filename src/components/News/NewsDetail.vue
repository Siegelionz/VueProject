<template>
    <div class="tmpl">
        <new-nav title="新闻详情"></new-nav>
        <div class="news-title">
            <p>{{newsDetail.title}}</p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsDetail.add_time | filterTime}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content"></div>
    </div>
</template>
<script>
    export default {
        created(){
            //接收列表传过来的值
            let newsLiseId = this.$route.query.id;
            //发起ajax请求  请求数据
            this.$axios.get('getnew/'+ newsLiseId)
            .then(res=>{
                this.newsDetail = res.data.message[0];
            })
            .catch(err=>{
                console.log(err);
            })
        },  
        data(){
            return {
                newsDetail:{}
            }
        }
    }

</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>
