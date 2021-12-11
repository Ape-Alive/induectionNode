const express =require('express');
// const path=require('path');
// const fs=require('fs');

const Routers=require('./routers/todolistRouters.js');


const port=7000;
const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.raw())

app.use("/todolist",Routers);
app.listen(port,()=>{
  console.log(`this soure is http://localhost:${port}`);
})