const express =require('express');
// const path=require('path');
// const fs=require('fs');
const cors = require('cors')
const bodyParser = require('body-parser');

const Routers=require('./routers/todolistRouters.js');
const LoginRouters=require('./routers/loginRouters.js');
const IndexpageRouters=require('./routers/indexpageRouters.js')

const port=7000;
// const port1=7050;
const app=express();
// const app1=express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.raw());
app.use(cors());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  //允许接收的请求头上加上一个Authorization，这样我们才能够将数据发送过去
  res.header('X-Powered-By', '3.2.1')

  // OPTIONS类型的请求 复杂请求的预请求
  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    /*让options请求快速返回*/
    next()
  }
})

app.use('/images', express.static('public'));
app.use("/todolist",Routers);
app.use("/loginlist",LoginRouters);
app.use("/indexpage",IndexpageRouters)

server.listen(port,()=>{
  console.log(`this soure is http://localhost:${port}`); 
})

// app.listen(port,()=>{
//   console.log(`this soure is http://localhost:${port}`);
// })