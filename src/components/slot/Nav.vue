<template>
    <div>
        <div class="cms-s-header">
            <h1 @click="goback">&nbsp<</h1>
            <h2 class="page-title">{{title}}</h2>
        </div> 
    </div>
</template>
<script>
    export default {
        props:['title'],
        name:'new-nav',
        data(){
            return {
                val:''
            }
        },
        methods:{
            goback:function(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
    .cms-s-header{
        background-color: #f7f7f7;
    }
    .tmpl h2,h1{
        display: inline-block;
    }
    h2{
        margin-left:99px;
    }
</style>

