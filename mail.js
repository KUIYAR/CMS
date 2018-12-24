'use strict';
//1.引入nodemailer模块
const nodemailer = require('nodemailer');

//2.创建nodemailer对象并配置端口信息
// nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'qq',//邮箱的服务商
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "2577433890@qq.com", // 默认邮箱
            pass: 'jzcacjowislidihb' // //smtp 授权码
        }
    });

    //2.2 调用发送方法
    function sendmail(mail,msg){
        return new Promise((resolve,reject)=>{
            //2.1 发送邮件相关信息
            let mailOptions = {
                from: '2577433890@qq.com', //发送人
                to: mail, //接收人
                subject: '后台管理系统邮箱验证码', //标题
                text: msg //文本内容
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error){
                    reject(error);
                }
                resolve('ok');
            })
        })
    }

    // console.log(sendmail('2577433890@qq.com','123'));   //测试
module.exports={sendmail};
// });
