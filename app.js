const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {   // 请求处理器函数
  console.log('在中间件中...');
  next();
});

app.use((req, res, next) => {
  console.log('在另外的一个中间件中...');
});

const server = http.createServer(app);

server.listen(3000);