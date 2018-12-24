//列表页

//1.引入模块
const express=require('express');
const foodModel=require('../model/foodModel.js');
const mail=require('../mail.js');
const util=require('../utils/util.js'); //数据返回格式

//2.创建路由
const Router=express.Router();

//4.设置路由（显示分页），查询数据库数据并根据判断是否返回给前端(总数据，目标页，每页5条)
Router.post('/foodlist',(req,res)=>{
	
	// console.log(req.body);

	let pagesize = Number(req.body.pagesize);	//每页请求的数据条数
	let target = Number(req.body.target);		//目标页
	let total = 0;								//总页数

	foodModel.find()
		.then((res) => {
			total = res.length;
			return foodModel.find().limit(pagesize).skip((target - 1) * pagesize);
		})
		.then((data)=>{
			let array = {
				total: total,
				foodlist: data,
				pagesize:pagesize
			}
			res.send(util.sendData(0,'请求成功',array));       //请求成功，返回数据给前端
			console.log(array);
		})
		.catch((err) => {
			console.log(err)
			res.send(util.sendData(-1,'请求失败',[]));      //请求失败，返回空数组
		})
})

//5.设置路由（新增菜品）
Router.post('/addfood',(req,res)=>{
    //查询数据
    // let insertData = {name:'鱼香肉丝',img:'img/1545578466714.png',type:'热菜',price:12,desc:'超好吃'};
    let {name,img,type,price,desc}=req.body;
    // console.log(insertData);
    
    // //插入数据
	foodModel.insertMany({name,img,type,price,desc})
	.then((data)=>{
	 res.send(util.sendData(0,'添加菜品信息成功！',data));
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'添加菜品信息失败！',[]));
	});
});

//6.设置路由（删除菜品）
Router.post('/delfood',(req,res)=>{

    //获取菜品id
	let id=req.body.id;
	if(!id){   //id不存在时
        res.send(util.sendData(-1,'参数错误',[]));
    }
	foodModel.deleteOne({_id:id})   //根据id删除菜品
	.then((data)=>{
        console.log(data)
	    res.send(util.sendData(0,'删除成功',data));
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'删除失败',[]));
	})
})

//7.分类查询
Router.post('/foodtype',(req,res)=>{

    let type = req.body.type;
    
	if(!type){
        res.send(util.sendData(-1,'参数错误！',[]));
    }

	foodModel.find({type:type})
	.then((data)=>{
	    res.send(util.sendData(0,'查询成功！',data));
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'查询失败！',[]));
	})
})

//8.通过id获取菜品信息
Router.post('/getFoodById',(req,res)=>{
    let id = req.body.id
    if (!id) {
        res.send(util.sendData(-1, '参数错误', []));
    }
    foodModel.find({ _id: id })
        .then((data) => {
            res.send(util.sendData(0, '查询成功！', data));
            console.log(data);
        })
        .catch((err) => {
            res.send(util.sendData(-1, '查询失败！', []));
            console.log(err);
        })
})

//3.暴露接口
module.exports=Router;