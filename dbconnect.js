//1.引入
const mongoose=require('mongoose');
//2.链接数据库
mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser:true});
//3.创建数据库对象（实例化对象）
let db = mongoose.connection;
//4.给数据库绑定监听事件
//4.1 数据库链接错误时
db.on('error',()=>{ console.log ('connection error:')});
//4.1 数据库链接成功时
db.on('open', function() {
  console.log("数据库连接成功!");
});
//4.3 数据库链接断开时
 db.on('disconnected', function () {
     console.log('数据库连接断开!');
 });


//5.1 创建schema对象
//  let Schema = mongoose.Schema;
//5.2 实例化schema对象
//  let userSchema=new Schema({
//      us:{type:String,required:true},    //type 字段类型  required 是否必须
//      ps:{type:String,required:true}
//  });
//5.3 将schema对象变成model //(集合名字,schema对象)
//  let usermodel=mongoose.model('user', userSchema);
//5.4 插入测试
// usermodel.insertMany({us:'123',ps:'456'})       
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });
//5.5 查询测试
// usermodel.find()
// .then((data)=>{
// 	console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });