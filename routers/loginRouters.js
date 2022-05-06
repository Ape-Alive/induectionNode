const express=require('express')
const UserDao=require('../dao/User.js')
const short = require('short-uuid');
const qs=require('qs')
// const http=require('http')
const Jwt=require('../utils/Jwt')
const router = express.Router()
const dao=new UserDao()
//密码账号登录
router.post('/login',async(req,res)=>{
    let jwt=new Jwt()
    let params=req.body
    let useObject={}
   for(let key in params){
    let i=0
      useObject[i]=key
      i++
  }
  let q=JSON.parse(useObject[0])
  let tokenkey=await jwt.getToken()
  
 let defineres=await dao.list({tel:q.tel,telarea:q.telarea,possword:q.password})
 
 if(defineres.length===0){
   let definetel= await dao.list({tel:q.tel})
   if(definetel.length!==0){
    let definepassword=await dao.list({tel:q.tel,possword:q.password})
    if(definepassword.length!==0){
        res.status(403).send({message:'电话区号错误'})
    }else{
        res.status(403).send({message:'密码错误'})
    }
   }else{
    res.status(403).send({message:'用户不存在'})
   }
   
 }else{
  //  console.log(defineres);
    res.status(200).send({message:'登录成功',token:tokenkey,userInfo:{
        role:defineres[0].role,
        nickname:defineres[0].nickname,
        headimg:defineres[0].headimg,
        power:defineres[0].power,
        email:defineres[0].email,
        oid:defineres[0].oid

    }})
 }
//  console.log(defineres)

})
//注册
router.post('/register',async(req,res)=>{
  let params=req.body
  let useObject={}
  for(let key in params){
    let i=0
      useObject[i]=key
      i++
  }
  let q=JSON.parse(useObject[0])
  let userinfos={
     oid:short.generate(),
     ...q,
     regtime:new Date()
  }
  
  
  let defineRes= await dao.list({tel:userinfos.tel})
  
  if(defineRes.length===0){
    await dao.save(userinfos)
   res.status(200).send({message:'注册成功'})
  }else{
    res.status(403).send({message:'用户已经存在'})
  }
  
  
})
//注册网名查重
router.post('/regnicknamerepeat',async(req,res)=>{
    let params=req.query
    let checkval=await dao.list({nickname:params.nickname})
    if(checkval.length===0){
        res.status(200).send({})
    }else{
        res.status(403).send({message:'网名已经被注册'})
    }
    // console.log(checkval);
})


module.exports=router