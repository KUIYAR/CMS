//用户登录注册路由

//1.引入模块
const express=require('express');
const userModel=require('../model/userModel.js');
const mail=require('../mail.js');
const util=require('../utils/util.js')

//2.创建路由
const Router=express.Router();

let obj = {};	//用于储存注册邮箱和验证码，注册成功就清空

//2.1 登录==>查询
Router.post('/login',(req,res)=>{
	let {us,ps}=req.body;
	// res.send({us,ps});
	// console.log({us,ps});
	userModel.find({us,ps})
	.then((data)=>{
		console.log(data);
		if(data.length>=1){
			return res.send(util.sendData(0,'登录成功！',[]))
		}
		res.send(util.sendData(-1,'登录失败！',[]))
	});
});

//2.2 注册==>插入
Router.post('/reg',(req,res)=>{
	let {us,ps,code}=req.body
	//验证码不匹配时
	if (obj[us]!==code){
		return res.send(util.sendData(-1,'验证码错误',[]))
	}

	userModel.insertMany({us,ps})
	.then((data)=>{
		res.send(util.sendData(0,'注册成功，请登录！',[]))
	})
	.catch((err)=>{
		console.log(err);
		res.send(util.sendData(-1,'注册失败！',[]))
	});
});

//2.3 获取邮箱验证码
Router.post('/getcode',(req,res)=>{
	let {email}=req.body;
	//邮箱为空或者不是邮箱格式时，返回错误信息
	if (!email||email==""){
		return res.send(util.sendData(-1,'邮箱为空或者格式错误',[]));
	}

	//生成随机验证码
	let num=(parseInt(Math.random(0,1)*1000)).toString();	//buffer进制转换

	mail.sendmail(email,num)
		.then((data)=>{
			//把邮箱验证码储存在obj中
			obj[email]=num;
			// console.log(obj);

			res.send(util.sendData(0,'验证码已发送',[]));
		})
		.catch((err)=>{
			console.log(err);
			res.send(util.sendData(-1,'验证码发送失败',[]));
		});
})

//3.暴露接口
module.exports=Router;

