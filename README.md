# MongoDb的使用

## 安装MongoDb服务

在主目录下添加
data/db
data/log/mongodb.log
mongodb.config

配置内容如下
```
#数据库路径
dbpath=c:\mongodb\data\db
#日志输出路径
logpath=c:\mongodb\data\log\mongodb.log
#错误日志采用追加模式，不会从新创建新文件
logappend=true
#启用日志文件，默认启用
journal=true
#这个选项可以过滤掉一些无用的日志信息，若需要调试请设置为false
quiet=true
#端口号，默认为27017
port=27017
#指定存储引擎；默认不添加，如报错再测试
#storageEngine=mmapvl
#http配置,可以通过28017端口用浏览器访问
#httpinterface=true
```

## 安装mongoVue客户端

## 安全性，创建用户命令参考

1. 在admin下创建账号密码和角色：
`db.createUser({user:"admin",pwd:"admin",roles:["root"]})`
Successfully added user: { "user" : "admin", "roles" : [ "root" ] }
2. 认证：
`db.auth("admin","admin")`
1
3. 切换数据库：
`use test`
4. 创建用户，只能操作test数据库
`db.createUser({user:'root',pwd:'123456',roles:[{role:'dbOwner',db:'test'}]})`

```
Successfully added user: {
        "user" : "root",
        "roles" : [
                {
                        "role" : "dbOwner",
                        "db" : "test"
                }
        ]
}
```

## 插入程序需要的数据

1. 创建数据库
`user db_demo`
2. 插入数据
`db.goods.insert({'producetId:'100001',productName:'aaa',salePrice:234,productImage:'1.jpg'})`
3. 客户端导入数据
在 MongoDb文件夹中提供 `dumall-goods` 和`dumall-users`
使用客户端导入前先创建 goods 和 users 两个集合
4. 通过命令导入：mongoimport -d db_demo -c users --file /文件路径
