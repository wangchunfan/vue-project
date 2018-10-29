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
  Goods.find({}, function (err, doc) {
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
