# 地址模块

## 地址列表功能实现

- 在view目录中,新建address.vue页面
- 添加路由
- 在购物车中设置页面跳转

## 地址展开和切换选择

地址展开

- 设置limit，默认显示条数
- 计算`addressListFilter(){return this.addressList.slice(0,limit)}`
- 展开时`this.limit == this.addressList.length`
- 关闭时`this.limit = 3`

通过索引index实现地址选中切换

```html
<li v-for="(item,index) in addressListFilter"
    :key="'addressList'+index"
    v-bind:class="{'check':checkedIndex==index}"
    @click="checkIndex=index">
    ...
</li>
```

## 设置默认地址