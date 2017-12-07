<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(ele,index) in swipes" :key="index">
                <a :href="ele.url">
                    <img :src="ele.img || ele.src" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        props:['url'],
        name:'my-swipe',
        data(){
            return {
                swipes:[]
            }
        },
        created(){
            this.$axios.get(this.url)
                .then( res=>{
                    this.swipes = res.data.message;
                } ) 
        },
    }
</script>
<style scoped>
    .mint-swipe{
        height:222px;
    }
    .mint-swipe-item img{
        width: 100%;
        height:100%;
    }
</style>

