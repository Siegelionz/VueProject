<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols="50" v-model="val"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click="publishComment">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(val,index) in comments" :key="index">
                     {{val.user_name}} ：{{val.content}}  {{val.add_time | filterTime}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain @click="loading">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
    export default {
        name:'my-comment',
        props:['id'],
        data(){
            return{
                pageindex:1,
                comments:[],
                val:'',
            }
        },
        methods:{
            publishComment:function(){
                //发起ajax请求
                this.$axios.post('postcomment/'+this.id,`content=${this.val}`)
                .then(res=>{
                    console.log(1);
                    //当成功之后重新刷新评论页面
                    this.getComment(this.id,1)
                    this.pageindex = 1
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            goback:function(){
                this.$router.go(-1);
            },
            loading:function(){
                this.$axios.get(`getcomments/${this.id}?pageindex=${this.pageindex}`)
                .then(res=>{
                    //要实现追加效果 就应该把上一次的加上新的评论数据
                    this.comments = this.comments.concat(res.data.message);
                    //点击了让pageindex++
                    this.pageindex++;
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            getComment(id,pageindex){
                this.$axios.get(`getcomments/${id}?pageindex=${pageindex}`)
                .then(res=>{
                    this.comments = res.data.message;
                    this.pageindex++;
                })
                .catch(err=>{
                    console.log(err);
                })
            },
        },
        created(){
            //假设一个父组件传过来的假的ID
            // let id = 22;
            //设置一下当前的页数  也先假设一个，如果通过url参数传的话，也要快速跳转
            this.pageindex = this.$route.query.pageindex || this.pageindex;
            //发起ajax请求
            this.$axios.get(`getcomments/${this.id}?pageindex=${this.pageindex}`)
            .then(res=>{
                this.comments = res.data.message;
                //初次进来 pageindex当前为第一页  进来啦 pageindex++变为第二页
                this.pageindex++
            })
            .catch(err=>{
                console.log(err);
            })
        },
        // 路由守卫
        beforeRouteUpdate(to,from,next){
            this.getComment(to.query.pageindex,this.pageindex);
            next();
        }
    }
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
