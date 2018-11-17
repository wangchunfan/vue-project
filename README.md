# 订单功能模块

1. 订单确认列表：订单列表数据和购物车列表数据使用同一个接口；订单列表中只显示已选择的商品；
2. 生成订单：将订单列表中的商品信息和地址信息保存到User对象的orderList属性中
3. 订单成功页面

注意：
post传参和get传参不同

```JavaScript
//前端，直接传值
            axios.post("/users/payMent", {
                addressId: addressId,
                orderTotal: this.orderTotal
            }).then(res => {
                let result = res.data
                if (result.status == '0') {
                    this.$router.push({
                        path: '/orderSuccess?orderId=' + result.result.orderId
                    })
                }
            })
//服务端，使用req.body
router.post('/payMent', function (req, res, next) {
  var userId = req.cookies.userId,
    orderTotal = req.body.orderTotal,
    addressId = req.body.addressId
)
```

```JavaScript
//前端传参使用 params
        axios.get("/users/orderDetail", {
            params: {
                orderId: orderId
            }
        }).then(res => {

        })
//服务端，使用req.param()方法
router.get('/orderDetail', function (req, res, next) {
  var userId = req.cookies.userId,
    orderId = req.param('orderId')
)
```