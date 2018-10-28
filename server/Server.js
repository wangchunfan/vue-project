let http = require('http')
let url = require('url')
let util = require('util')
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
server.listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行；")
})
