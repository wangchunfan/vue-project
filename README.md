# 登录模块的实现

## 登录

- 引入登录框HTML和css内容
- 后端根据用户名、密码进行查找
- 前端实现校验

## 登出

- 后端清空cookie，返回空
- 前端调用，还原data中的相应值

## 登录拦截

在未登录前禁止某些后端请求；
在服务端app.js中添加

```javascript
//登录拦截
app.use(function (req, res, next) {
  console.log('originalUrl:' + req.originalUrl)//  originalUrl:/goods?page=1&pageSize=8&sort=1&priceLevel=all
  console.log('path:' + req.path) // path:/goods
  if (req.cookies.userId) {
    //如果已经登录，则直接运行
    next()
  } else {
    //未登录白名单
    if (req.originalUrl == '/users/login' ||
      req.originalUrl == '/users/logout' ||
      req.path == '/goods') {
      next()
    } else {
      res.json({
        status: '1001',
        msg: '当前未登录',
        result: ''
      })
    }
  }
})
```

## 登录校验

每次刷新页面时通过后端检验cookies中是否有用户登录信息；返回与登录时相同的数据

## 全局模态框组件

子组件可以接受父组件传递的值，但是不能修改

Model子组件

```javascript
  methods:{
      closeModel(){
          this.$emit('close')
      }
  }
```

父组件

```html
   <model v-bind:mdShow="mdShow" v-on:close="closeModel()"></model>
```