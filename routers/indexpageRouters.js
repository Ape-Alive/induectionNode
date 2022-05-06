const express=require('express');
const fs=require('fs');
const path=require('path')
const multer = require('multer');
const router=express.Router();
const GroupchatDao =require('../dao/Groupchat')
const short = require('short-uuid');
const dao=new GroupchatDao()
// const multiparty = require('multiparty');
const Storage = multer.diskStorage({
    // destination:path.join(__dirname,'public','uploads'),
    destination:path.join(__dirname,'../public/uploads/communityImages'),
  
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
  });
  
const multerconfig = multer({ storage: Storage }); 
const updateBaseUrl='http://localhost:7000'//服务器地址端口
const imgPath='/images/uploads/communityImages/'//上传到服务器的虚拟目录
function upload(req,res){
return new Promise((resolve,reject)=>{
    multerconfig.single('file')(req,res,function(err){
        if(err){
            reject(err)
        }else{
          
            resolve(updateBaseUrl + imgPath + req.file.filename)
           
            
        }
    })
})
}

router.post('/createchatuploadimg',async(req,res)=>{
    
   let imgsrc=await upload(req,res)
   let chatmgs={
            oid:short.generate(),
            backgroundimg:imgsrc,
            groupchatcolor:[req.query.groupchatcolor[0],req.query.groupchatcolor[1]],
            groupchatname:req.query.groupchatname,
            grouptags:[...req.query.grouptags],
            groupchatcontent:req.query.groupchatcontent,
            groupchatleader:req.query.groupchatleader,
            groupchattime:new Date()
        }
   let chatupdata={
        backgroundimg:imgsrc,
        groupchatcolor:[req.query.groupchatcolor[0],req.query.groupchatcolor[1]],
        groupchatname:req.query.groupchatname,
        grouptags:[...req.query.grouptags],
        groupchatcontent:req.query.groupchatcontent,
        groupchatleader:req.query.groupchatleader,
    }
//    console.log(req.query.groupchatcolor[0]);
   if(req.body.imgid){
      
    let chatresult= await dao.update(req.body.imgid,{...chatupdata})
    console.log('chatresult',chatresult);
    if(chatresult.acknowledged){
        res.send({
                "code": "ok",
                "message": "更新成功",
                'data': {
                    //  url: imgsrc,
                     oid:req.body.imgid
    
    
            }
         })
      }else{
        res.status(500).send({
            "code": "error",
            "message": '更新失败' || '',
          });
      }
   }else{
    let chatresult= await dao.save(chatmgs)
    if(chatresult.backgroundimg===imgsrc){
      res.send({
              "code": "ok",
              "message": "上传成功",
              'data': {
                  //  url: imgsrc,
                   oid:chatresult.oid
  
  
          }
       })
    }else{
      res.status(500).send({
          "code": "error",
          "message": '上传失败' || '',
        });
    }
   }
  

}
   
   
)




module.exports=router