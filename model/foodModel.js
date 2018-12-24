const  mongoose=require('mongoose');

//1.创建schema对象并实例化
let Schema = mongoose.Schema;
let foodSchema=new Schema({ //type：字段类型，required：是否必须
    name:{type:String,required:true},
  	img:{type:String,required:true},
  	type:{type:String,required:true},
  	price:{type:Number,required:true},
  	desc:{type:String,required:true},
  	hot:{type:String}
});

//2.将schema对象变成model   ==>(集合名字,schema对象)
let foodmodel=mongoose.model('food', foodSchema);

//3.暴露接口
module.exports=foodmodel;
