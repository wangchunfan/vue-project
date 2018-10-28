# Node

## 创建服务端

```
let http = require('http')
let url = require('url')
let util = require('util')
let server = http.createServer(function (req,res) {
  res.statusCode = 200;
  res.setHeader("Content-Type","text/plain;charset=utf-8")
  res.end(util.inspect(url.parse(req.url)))
})
server.listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行；")
})
```

### 访问Html页面

使用`fs`文件模块

```
let fs = require('fs')

let server = http.createServer(function (req,res) {
  var pathname = url.parse(req.url).pathname
  fs.readFile(pathname.substring(1),function (err,data) {
    if(err){
      res.writeHead(404,{
        'Content-Type':'text/html;charset=utf-8'
      })
      res.write('访问的页面不存在！！')
    }else{
      res.writeHead(200,{
        'Content-Type':'text/html'
      })
      console.log(data.toString())
      res.write(data.toString())
    }
    res.end()
  })
})
```


## 创建客户端

调用第三方服务

```
var http = require('http')
http.get('http://www.qq.com/?pgv_ref=sogoubrowser', function (res) {
  let data = ''
  res.on('data', function (chunk) {
    data += chunk
  })
  res.on('end', function () {
    //let result = JSON.parse(data);
    console.log('result' + data)
  })
})
```

## 基于Express框架运行环境

- 安装express generator 生成器

`cnpm i -g express-generator`

- 通过生成器自动创建项目

`express server-express`

- 配置分析

前后端分离：
进入 server-express目录运行`cnpm i`根据package.json 安装相关依赖
然后运行 node bin/www 服务，访问127.0.0.1:3000 即可

前后端合并：
可以将package.json中dependencies下的内容copy到主项目的package中
同样安装依赖后运行服务

- 使用HTML不使用jade

安装`cnpm i ejs --save`

进入app.js
```
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
var ejs = require('ejs')
app.engine('.html', ejs.__express)
app.set('view engine', 'html')
```


---
>实例文件夹 server
