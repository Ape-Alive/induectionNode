// 从 mongoose 模块中导入 Schema
const { Schema } = require('mongoose');
// 导入用于获取数据库链接的模块
const connection = require('../db/mongo.js');

// 创建一个规则 ( 类似于指定表中的表结构 )

const groupchatSchema = new Schema({
    // Object Identifier ，对象标识(zhi)符
    oid: { type: String, default: '' },//信息的唯一id
    groupchatname:{ type: String, default: '' },//群名称
    grouptags:{ type: Array, default: [] },//群标签
    groupchatcontent:{ type: String, default: '' },//群简介
    groupchatcolor:{ type:Array, default: [] },//群背景颜色
    backgroundimg:{ type: String, default: '1111' },//群背景图
    groupchatleader:{type:String,default:''},//群主
    groupchatadministrator:{type:Array,default:[]},//群管理员
    groupchatusers:{type:Array,default:[]},//普通群员
    groupchattime:{type:Date,default:null},//普通群员
    groupchatmessages:[
        new Schema(
            {
              userid: {
                type: String,
                require: true,
              },
              chatmessage: {
                type: String,
                default: "",
              },
              chattime:{
                type:Date,
                default: null,
              }
            },
            {
    
                versionKey: false
            } 
          ),
       ],
    }, {
    
    versionKey: false
});

// 使用 connection 的 model 函数创建一个 Model (相当于是个构造函数)
const Groupchat = connection.model('chatgroup', groupchatSchema);

// 使用 CommonJS 方式导出(Node.js 支持 CommonJS)
module.exports = Groupchat;