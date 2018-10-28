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
