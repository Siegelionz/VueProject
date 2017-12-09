//开启严格模式
'use strict'
//定义一个对象 
let obj = {};
//存放localStorage
let storage = window.localStorage;
//判断一下当前storage是否存在值
obj.setBallNum = function(objval){
    //获取本地存储 获取到的为字符串 应该转变为对象   
    let getItem =  JSON.parse(storage.getItem('ball') || '{}');
    // id:num   22 : 2
    //如果获取到的存储中的对象有我们传过来的id对应的值，说明本地存储有该值  让内容追加

    // 获取到本地储存转变为对象 接收传进来的参数 判断这个对象的以参数的id为属性名 
    // 判断一下是否有值没有值触发else  把当前的参数id作为存储对象的id 参数的num作为value，再变为字符串存回本地
    
    if(getItem[objval.id]){
        getItem[objval.id] += objval.num
    }else{
        //否则的话 说明没有该存储   需要我们设置本地存储 储存的时候为字符串
          getItem[objval.id] = objval.num   
    }
    storage.setItem('ball',JSON.stringify(getItem));
}

//导出
export default obj;