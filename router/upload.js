//上传文件路由

//1.引入模块
const express=require('express');
const multer=require('multer');
const fs=require('fs');
const path=require('path');

let upload = multer({ dest: 'uploads/' })//设置图片的临时保存路径

//2.创建并设置路由
const Router=express.Router();
Router.post('/img',upload.single('test'),(req,res)=>{   //将文件临时存储在uploads里，single：单文件上传

    // console.log(req.file);  //图片的信息

    //2.1 读取图片信息
    fs.readFile(req.file.path,(err,data)=>{
        //读取错误时
        if(err){
            return res.send("上传错误");
        }

        //2.2 以时间命名并与截取到的图片后缀名 (png.jpeg)拼接
        let  filename=new Date().getTime()+parseInt(Math.random(0,1)*1000)+"."+req.file.mimetype.split('/')[1]

        console.log(filename);

        //2.3 图片上传成功时，进行写入图片信息（(当前路径，相对路径，图片名字),返回的二进制数据,(错误信息)）
        fs.writeFile(path.join(__dirname,'../public/img',filename), data,(err)=>{
            if(err){
                res.send({
                    err:1,
                    msg:err
                });
            }else{
                res.send({
                    err:0,
                    msg:'ok',
                    path:'img/'+filename
                });
            }
        });
    })
});

//3.暴露接口
module.exports=Router;
