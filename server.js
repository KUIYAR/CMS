//1.引入express模块，搭建服务器
const express=require('express');
let app=express();
const path=require('path');

//5.引入dbconnect模块
const db=require('./dbconnect.js');

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	// 跨域请求CORS中的预请求
	if(req.method=="OPTIONS") {
	  res.send(200);/*让options请求快速返回*/
	} else{
	  next();
	}
});

//静态文件开启
app.use(express.static(path.join(__dirname,'./public')))
//开启admin静态文件
app.use('/admin',express.static(path.join(__dirname,'./admin')))

//4.引入中间件并设置post参数解析
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//3.引入router路由并设置
//3.1 用户登录注册
const user=require('./router/user.js');
app.use('/api/user',user);
//3.2 上传
const upload=require('./router/upload.js');
app.use('/api/upload',upload);
//3.3 列表
const food=require('./router/food.js');
app.use('/api/food',food);



//2.配置监听端口
app.listen(6500,()=>{
	console.log('server start in port 6500');
})