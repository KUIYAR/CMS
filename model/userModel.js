//1.引入
const mongoose=require('mongoose');
//2.创建schema对象
 let Schema = mongoose.Schema;
//3.实例化schema对象
 let userSchema=new Schema({
     us:{type:String,required:true},    //type 字段类型  required 是否必须
     ps:{type:String,required:true}
 });
//4.将schema对象变成model //(集合名字,schema对象)
 let usermodel=mongoose.model('user', userSchema);
//5.插入测试
// usermodel.insertMany({us:'123',ps:'456'})       
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });
//6.查询测试
// usermodel.find()
// .then((data)=>{
// 	console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });

//7.暴露接口
module.exports=usermodel;