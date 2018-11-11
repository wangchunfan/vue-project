# 购物车模块

## 购物车列表功能

- 实现后端接口
- 新增vue页面`Cart.vue`,页面布局设置
- 添加路由

```javascript
    {
      path:'/cart',
      name:'Goodslist',
      component:Cart
    }
```

## 购物车商品删除

mongoDb删除子集合中的数据

```javascript
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {

  })
```

## 购物车商品数量、选中状态修改

- 购物车中商品选中状态要存数据库
- MongoDB修改子集合中数据

```JavaScript
User.update({
    'userId': userId,
    "cartList.productId": productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function (err, doc) {

  })
```

## 购物车全选和商品总价实时计算

- 全选为计算属性，根据列表的选择状态实时计算；如此不用存数据库

```javascript
  computed: {
    //是否全选
    checkAllFlag() {
      return (
        this.cartList.filter(item => item.checked == 1).length == this.cartList.length
      );
    },
    //总价计算
    totalPrice() {
      return this.cartList.reduce(function(total, item) {
        return total + (item.checked == 1 ? item.productNum * item.salePrice : 0)
      },0);
    }
  },
```

## 金额格式化

引用插件：[https://github.com/vuejs/vuex/edit/dev/examples/shopping-cart/currency.js](https://github.com/vuejs/vuex/edit/dev/examples/shopping-cart/currency.js)

- 局部使用

```JavaScript
import {currency} from './../util/currency'
  //过滤器,Vue的属性，和data，methods并列
  filters:{
     currency: currency
  }
//使用
{{totalPrice|currency('$')}}
```

- 全局使用

在`main.js`中引用

```JavaScript
import {currency} from './util/currency'
Vue.filter('currency',currency)
//使用
{{totalPrice|currency('$')}}
```