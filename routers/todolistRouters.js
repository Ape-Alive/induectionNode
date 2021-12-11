const express=require('express');
const fs=require('fs');
const path=require('path')
const router=express.Router();

router.get("/getinfo",(req,res)=>{
  // const jsonPath=path.join(__dirname,'');
 const jsonpath =path.resolve(__dirname, '../static/test.json');
 const jsonData= fs.readFile(jsonpath,'utf-8',(err,data)=>{
   
 const promise=new Promise((resolve,reject)=>{
    if(err){
      reject(err)
    }
      resolve(data)
    
   })
  promise.then(
  (data)=>{
    console.log(req.url);
  const  jsondata=JSON.stringify(data);
  res.header("Access-Control-Allow-Origin","*")
  res.status(200).send(jsondata);
  },
 (err)=>{
   res.send(err)
  })
  })
})



module.exports =router