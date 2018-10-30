var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//此处要加s可以和Good关联
var Goods = require('../models/goods');
//链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_demo');

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
  let skip = (page - 1) * pageSize  //跳过数量
  let sort = req.param("sort")
  //条件查找
  let params = {}
  //分页
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  //排序
  goodsModel.sort({ 'salePrice': sort })
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

module.exports = router;
