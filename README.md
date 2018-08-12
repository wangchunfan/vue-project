## 双向数据绑定

使用`Object.defineProperty`方法为对象创建属性
在获取属性值或者赋值时会自动调用其中的get和set方法

```
var person = {
        age: 16
    }
    Object.defineProperty(person, 'userName', {
        //value: '张三',
        get: function () {
            console.log('获取属性值时自动触发')
        },
        set: function (value) {
            console.log('为属性赋值时自动触发:'+value)
        }
    })
    person.userName = '张三'
    person.userName
```

监听元素的keyup事件，改变属性值，在set方法中修改view

[测试代码](test/01双向数据绑定.html)

## Vue基础语法

[详细介绍](doc/02Vue基础语法.md)

## vue 路由介绍

[详细介绍](doc/03路由基础.md)

## vue-resource

引用方式

- `<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>`
- `npm install vue-resource --save`

API是挂在到Vue实例上面的

[测试代码](test/04vue-resource.html)

## axios

引用方式

- `npm install axios`
- `script src="https://unpkg.com/axios/dist/axios.min.js"></script>`



[测试代码](test/05axios.html)

## export和import

默认输出
```
export default({
  router: {
  }
})
```

```
//导入
import router from './touter'
```

暴露 router 对象

```
 export let router new Router({
   router: {
   }
 })
 //等同于
 let a = '123'
 export a
```

```
 //导入方式，通过解构方式获取对象
 import {router} from './touter'
```

暴露多个对象

```
export let sum = (x, y) =>{
  return x + y
}
export let minus = (m, n)=>{
  return m - n
}
```

```
//导入方式1
import {sum,minus} from './until'
sum(1,2)
```

```
//导入方式2
import * as util form './util'
util.sum(1,2)
```

## AMD、CMD、CommonJs、ES6

- AMD是异步模块定义概念，在RequireJS推广过程中产出，RequireJS是对这个概念的实现;依赖前置

```
define(['package/lib'],function(){
  function foo(){
    lib.log('hello world')
  }
  return {
    foo: foo
})
```

- CMD同步模块定义概念，SeaJS;依赖就近

```
define(function(require, exports, module){
  var $ = require('jquery')
  var Spinning = require('./spinning')
})
```

- CommonJs是服务端的规范 ,前端不支持;两种输出：module.exports/exports.xxx

```
exports.aera = function(r){
  return Math.PI * r * r
}
```

- export/import;ES6新增

```
export default{
  props: ['num'],
  data(){
    return{
    }
  }
}
```
