var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodbAddress = 'mongodb://192.144.199.235:27017/db_demo'
//此处要加s可以和Good关联
var Goods = require('../models/goods');
//链接数据库
mongoose.connect(mongodbAddress);

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
})

mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})

mongoose.connection.on('duscibbected', function () {
  console.log('MongoDB connected disconnected.')
})

router.get('/', function (req, res, next) {
  //获取前端参数
  let page = parseInt(req.param("page"))
  let pageSize = parseInt(req.param("pageSize"))
  let sort = req.param("sort")
  let priceLevel = req.param("priceLevel")
  let skip = (page - 1) * pageSize //跳过数量
  let priceGt = '',
    priceLet = '';

  //条件查找
  let params = {}
  if (priceLevel != 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0;
        priceLet = 100;
        break;
      case '1':
        priceGt = 100;
        priceLet = 500;
        break;
      case '2':
        priceGt = 500;
        priceLet = 1000;
        break;
      case '3':
        priceGt = 1000;
        priceLet = 5000;
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLet
      }
    }
  }

  //分页
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  //排序
  goodsModel.sort({
    'salePrice': sort
  })
  goodsModel.exec({}, function (err, doc) {
    //直接查询所有
    //Goods.find({}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})
//加入购物车
router.post("/addCart", function (req, res, next) {
  var userId = "1",
    productId = req.body.productId;
  var User = require('../models/user')
  //通过用户ID查询该用户信息
  User.findOne({
    userId: userId
  }, function (err, userDoc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if (userDoc) {
        let goodsItem = ''
        userDoc.cartList.forEach(function (item) {
          if (item.productId == productId) {
            goodsItem = item
            item.productNum ++
          }
        })
        //是否已存在该商品；存在直接商品数量++；否则插入新商品
        if (goodsItem) {
          userDoc.save(function (err2, doc2) {
            if (err2) {
              res.json({
                status: "1",
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          })
        } else {
          //通过商品id查询该商品信息
          Goods.findOne({
            productId: productId
          }, function (err1, doc) {
            if (err1) {
              res.json({
                status: "1",
                msg: err1.message
              })
            } else {
              if (doc) {
                doc._doc.productNum = 1
                doc._doc.checked = 1
                //将商品信息加入到用户信息中
                userDoc.cartList.push(doc);
                userDoc.save(function (err2, doc2) {
                  if (err2) {
                    res.json({
                      status: "1",
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'suc'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})

module.exports = router;
