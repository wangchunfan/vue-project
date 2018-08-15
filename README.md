# 商品列表模块实现

## 商品列表组件拆分

- Header组件
- Footer组件
- 面包屑组件

将页面拆分成几个部分，每个部分封装成一个组件；
其他页面可以`共用`这些组件，这些组件放到src>component目录中；

商品列表可以是一个单独的页面，所以将其放到src>views目录中；

src>assets>css 中存放组件相关的静态资源；小图片会打包为base64格式；
static 页面加载的图片


### 面包屑NavBread插槽的使用

**一对一插槽**

```
//接收值
<slot></slot>

//传值
<span>张三</span>

```

**多对多插槽**

可以有一个有名字，另一个无名字;
两个都无名字，会渲染成： 张三23 张三23

```
//接收值
<slot name="userName"></slot>
<slot name="age"></slot>
//传值
<span slot="userName">张三</span>
<span slot="age">23</span>
```

## 商品列表数据渲染实现

### 模拟mock数据

加载商品列表信息；减少对后台接口的依赖；
创建mock文件夹存放这些内容;goods.json文件中不要写注释，不要有多余的逗号等其他符号；

- status表示状态
- msg为成功或错误时的信息
- result为返回数据，是一个数组

```
{
  "status":"0",
  "msg":"",
  "result":[
    {
      "productId":"1001",
      "productName":"音箱",
      "productPrice":"2499",
      "productImg":"1.jpg"
    }
  ]
}
```

### 模拟后台数据

在build>dev-server.js中设置路由，最新的vue中dev-server.js被替换成了webpack-dev-conf.js

第一步：在build>webpack-dev-conf.js中`const portfinder = require('portfinder')`这段代码下添加

```
const portfinder = require('portfinder')

//导入express
const express = require('express')
//请求server
const app = express()
//加载本地数据文件
var goodsData = require('./../mock/goods.json')
//获取路由
var router = express.Router()
//通过路由请求数据
app.use(router)
```

第二步，在devServer对象中添加before方法

```
 before(app) {
     app.get('/goods', (req, res) => {
         res.json({
             errno: 0,
             data: goodsData
         })
     })
 }
```

[参考：最新的vue没有dev-server.js文件，如何进行后台数据模拟？](https://blog.csdn.net/qq_34645412/article/details/78833860)


### axios获取数据并渲染

`cnpm install axios --save` 加上`--save`会改变package.json；否则不改变package.json也可正常使用；

```
  "dependencies": {
    "axios": "^0.18.0",
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  }
```

在 `mounted` 时调用获取数据的方法

```
  import axios from 'axios'

  export default {
  //组件中的data是一个函数，避免组件之间影响；实例组件可以是一个对象
    data() {
      return {
        goodsList: []
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    mounted: function () {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        axios.get("/goods").then((result) => {
          var res = result.data
          this.goodsList = res.result
        })
      }
    }
  }
```

将商品信息数据数组通过`v-for`渲染到页面

```
<li v-for="(item,index) in goodsList">
    <div class="pic">
        <!--图片需要动态绑定，不能直接写src=""，这样会因页面渲染太快而导致图片未加载-->
        <a href="#"><img v-bind:src="'/static/'+item.productImg" alt=""></a>
    </div>
    <div class="main">
        <div class="name">{{item.productName}}</div>
        <div class="price">{{item.productPrice}}</div>
        <div class="btn-area">
            <a href="javascript:;" class="btn btn--m">加入购物车</a>
        </div>
    </div>
</li>
```


## 价格筛选条件设计

通过索引实现价格条件选中样式;
利用class的true或false来隐藏或显示;
没必要每个`<dd>`都用v-for实现;

```
<!-- filter -->
<div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
    <dl class="filter-price">
        <dt>Price:</dt>
        <!--特殊存在未绑定-->
        <dd>
            <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a>
        </dd>
        <!--v-for 绑定格式相同数据-->
        <dd v-for="(prices,index) in priceFilter">
            <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{prices.startPrice}}
                  - {{prices.endPrice}}</a>
        </dd>
    </dl>
</div>
```

价格筛选条件的响应式布局

```
methods: {
      //响应式布局：点击显示价格筛选条件
      showFilterPop() {
        this.filterBy = true
        this.overLayFlag = true
      },
      //价格选择：菜单样式改变；响应式时：关闭价格筛选，关闭遮罩层
      setPriceFilter(index){
        this.priceChecked = index
        this.closePop()
      },
      //响应式布局：点击关闭价格选择和遮罩层
      closePop(){
        this.filterBy = false
        this.overLayFlag = false
      }
```

## 图片赖加载

- 图片不会一次性全部加载，滚动到屏幕上时加载
- 照顾用户体验

使用npm模块  `vue-lazyload`
安装`npm install vue-lazyload --save`

main.js中引用,并添加赖加载时引用的svg图片

```
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
  loading:'./../static/loading-svg/loading-bars.svg'
})
```

这些图片的颜色可以改变,打开`.svg`文件，修改fill

```
fill="#ee7a23"
```

[详细使用，参考官网](https://www.npmjs.com/package/vue-lazyload)
