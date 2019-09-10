# 商城小项目

该项目使用

- vue
- node
- mongodb

创建若干分支，每个分支实现了一个功能模块或者是讲诉一个知识点

- `basic-vue`：vue基础
- `module-goodsList`：商品列表模块的前端实现
- `node`：后端 Node 服务搭建
- `mongodb`：mongodb 的使用
- `module-goods-and-mongodb`：基于 node 和 MongoDB 开发商品列表后端接口
- `module-login`：登录模块的实现
- `module-goodsCart`：购物车模块
- `module-address`：地址模块
- `module-order`：订单模块
- `dev`：开发分支
- `master`：主分支，包含所有功能

## 启动项目

导入 MongoDB 数据，参考 mongodb 分支

修改 `config/index.js` 下的访问地址和端口，还要代理 target，启动前端

```
npm install
npm run dev
```

修改 `server-express/routes/goods.js` 的 MongoDB 连接串，启动后端

```
cd server-express
npm install
node bin/www
```

## 在线访问地址

