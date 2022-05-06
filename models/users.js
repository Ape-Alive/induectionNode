
// 从 mongoose 模块中导入 Schema
const { Schema } = require('mongoose');
// 导入用于获取数据库链接的模块
const connection = require('../db/mongo.js');

// 创建一个规则 ( 类似于指定表中的表结构 )

const usersSchema = new Schema({
    // Object Identifier ，对象标识(zhi)符
    oid: { type: String, default: '' },//信息的唯一id
    username: { type: String, default: '' },//用户账号名称
    nickname:{type: String, default: ''},//用户昵称
    old: { type: String, default: '' },//用户年龄
    possword: { type: String, default: '' },//用户密码
    tel: { type:String ,default:'' },//用户电话
    telarea:{type:String ,default:'86'},//用户电话区号
    power: { type: Array, default: [] },//用户权限
    headimg:{type:String,default:'http://localhost:7000/loginlist/getimg?id:1'},//用户头像
    regtime:{type:Date,default:null},//用户注册时间
    role:{type:String,default:'tourist'},//用户角色
    email:{type:String,default:''},//用户邮件
    
}, {
    versionKey: false
});

// 使用 connection 的 model 函数创建一个 Model (相当于是个构造函数)
const Users = connection.model('users', usersSchema);

// 使用 CommonJS 方式导出(Node.js 支持 CommonJS)
module.exports = Users;