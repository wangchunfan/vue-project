# 基于node开发商品列表接口

如何使用node.js启动项目、调试项目

- 通过node命令启动项目
- webstorm配置启动入口,可以进行调试
- pm2 安装：`cnpm i pm2 -g`；启动项目：`pm2 start ...项目`

## 获取MongoDB数据库数据

### 服务端与数据库连接

创建models

- 安装mongoose `cnpm i mongoose --save`
- 创建moduls目录，新建goods模型和MongoDB中的goods集合关联
- 新建路由，首先在app.js中添加，然后再routes文件中中新增goods.js
- 在路由中链接MongoDB，查找数据

路由设置

- 项目启动时执行www需要导入app.js，此时app.js被执行
- router目录中的文件在app.js中引用
- 路由文件中定义了客户端访问时执行的操作和返回的内容
- 数据库也在启动服务时连接成功

supervisor插件

- 可以监控后端代码变化

### 前端获取服务端数据

- 服务端已经从数据库中获得了数据，前端如何从服务端获取呢

创建代理

- 开发时：前端访问的是8080端口，服务端是3000端口，产生了跨域，所以需要代理转发
- 正式发布前后端应该部署到一起

在config/index.js  下 `proxyTable` 对象中添加

```JavaScript
    proxyTable: {
      '/goods': {
        target: 'http://localhost:3000'
      }
    },
```

## 商品数据列表排序和分页

- 首先实现服务端从数据库获取分页并排序后的数据
- 然后前端从服务端获取数据，并实现页面的相应业务逻辑

### 排序

给页面的排序按钮绑定排序方法，修改排序参数

### 分页

- 使用`vue-infinite-scroll`插件
- 安装：`npm install vue-infinite-scroll --save`
- 参考使用手册

```javascript
    loadMore: function() {
      //busy为true时禁用插件功能
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    },
```

## 价格过滤功能

为每个过滤按钮绑定方法，向服务端传入参数，使用MongoDB的比较运算符

## loading插件

加入loading图片；默认设置不显示；当获取数据时显示

```html
 <!-- 滚动条 -->
 <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <img v-show="isLoading" src="static/loading-svg/loading-balls.svg"/>
</div>
```

## 使用lazy图片只加载一次问题

需要添加`key`属性

```html
<a href="#"><img v-lazy=" 'static/' + item.productImage" :key="item.productImage" ></a>
```

## 加入购物车