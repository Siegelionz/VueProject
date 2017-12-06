<template>
    <div>  
        <new-nav title='图文详情'></new-nav>

        <div class="photo-title">
            <p>{{details.title}}</p>
            <span>发起日期：{{details.add_time | filterTime}}</span>
            <span>{{details.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <my-ul>
            <my-li v-for="(img,index) in imgs" :key="index">
                <img class="preview-img" :src="img.src" @click="$preview.open(index, imgs)">
            </my-li>    
        </my-ul>
        <div class="photo-desc">
            <p v-html="details.content"></p>
        </div>
        <my-comment :id="$route.params.detailid"></my-comment>
    </div>
</template>
<script>
    export default {
        created(){
            let detailid = this.$route.params.detailid;
            this.$axios.get('getimageInfo/'+detailid)
            .then(res=>{
                this.details = res.data.message[0];
            })
            .catch(err=>{
                console.log(err);
            })
            this.$axios.get('getthumimages/'+detailid)
            .then(res=>{
                this.imgs = res.data.message
                this.imgs.forEach(ele=>{
                    ele.h = 400;
                    ele.w = 600;
                })
            })
            .catch(err=>{
                console.log(err);
            })
        },
        data(){
            return{
                details:{},
                imgs:[],
            }
        }
    }
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.photo-desc p {
    font-size: 18px;
}

</style>
