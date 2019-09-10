# MongoDb的使用

## 安装MongoDb服务

在主目录下添加以下文件

- data/db
- data/log/mongodb.log
- mongodb.config

在 mongodb.config 中配置内容如下

```json
#数据库文件路径
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

启动mongod数据库服务

```
./mongod -f mongodb.conf
```

进入mongodb数据库

```
./mongo
```

参考：[Linux下MongoDB安装和配置](https://www.jianshu.com/p/d4ae4f5d283a)

## 安装 adminMongo 可视化客户端

下载源码

```
git clone https://github.com/mrvautin/adminMongo.git
```

安装依赖

```
npm instal
```

启动应用

```
npm start 或者 node app
```

打开浏览器，输入 `http://127.0.0.1:1234` 就可以看到adminMongo的界面了！

参考：[一款好用 mongodb 可视化工具](https://www.jianshu.com/p/2e52eb2296a6)

## 安全性，创建用户命令参考

在admin下创建账号密码和角色：

```
db.createUser({user:"admin",pwd:"admin",roles:["root"]})`
//Successfully added user: { "user" : "admin", "roles" : [ "root" ] }
```

认证：

```
db.auth("admin","admin")`
```

切换数据库：

```
use test
```

创建用户，只能操作test数据库

```
db.createUser({user:'root',pwd:'123456',roles:[{role:'dbOwner',db:'test'}]})

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

创建数据库

```
use db_demo
```

创建集合

```
db.createCollection(name, options)
```

插入数据

```
db.goods.insert({'producetId:'100001',productName:'aaa',salePrice:234,productImage:'1.jpg'})
```

客户端导入数据

在 MongoDb文件夹中提供 `dumall-goods` 和`dumall-users`
使用客户端导入前先创建 goods 和 users 两个集合

通过命令导入：`mongoimport -d db_demo -c users --file /文件路径`
