<template>
    <div>
        <new-nav title="图文分享"></new-nav>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="list in lists" :key="list.id">
                    <a @click="go(list.id)">{{list.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="ele in imgs" :key="ele.id">
                    <router-link :to="{name:'photodetail',params:{detailid:ele.id}}">
                        <img  v-lazy="ele.img_url">
                        <p>
                            <span>{{ele.title}}</span>
                            <br>
                            <span >{{ele.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        methods:{
            go:function(id){
                //发生ajax请求
                this.$axios.get('getimages/'+id)
                .then(res=>{
                    this.imgs = res.data.message;
                })
                .catch(err=>{
                    console.log(err);
                })
                
            }
        },
        created(){
            //接收id值
            let photolistid = this.$route.params.listid;
            //ajax请求拿数据
            this.$axios.get('getimages/'+photolistid)
            .then(res=>{
                this.imgs = res.data.message;
            })
            .catch(err=>{
                console.log(err);
            })
            //拿图文列表
            this.$axios.get('getimgcategory')
            .then(res=>{
                this.lists = res.data.message;
                //根据要求  后台没有全部的选项  自己写一个
                this.lists.unshift({
                    id:0,
                    title:'全部'
                })
            })
            .catch(err=>{
                console.log(err);
            })
        },
        data(){
            return{
                imgs:[],
                lists:[]
            }
        },
        //当出现用户在url地址上手动多次请求数据是 
    }
</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}



</style>
