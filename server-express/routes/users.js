var express = require('express');
var router = express.Router();
var User = require('./../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//登录接口
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (doc) {
        //存放到cookis中
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        //存放到session中，需要安装插件
        //req.session.user = doc
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.json({
          status: '1',
          msg: ''
        })
      }
    }
  })
})

//登出接口
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

//登录验证
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: {
        userName: req.cookies.userName
      }
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

//获取购物车列表
router.get('/cartList', function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({
    userId: userId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

//购物车删除
router.post('/cartDel', function (req, res, next) {
  let userId = req.cookies.userId,
    productId = req.body.productId
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        resutlt: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '删除成功',
        result: 'suc'
      })
    }
  })
})
//购物车商品数量/选中修改
router.post('/cartEdit', function (req, res, next) {
  let userId = req.cookies.userId,
    productNum = req.body.productNum,
    productId = req.body.productId,
    checked = req.body.checked
  //子文档的更新
  User.update({
    'userId': userId,
    "cartList.productId": productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        resutlt: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '更新成功',
        result: 'suc'
      })
    }
  })
})

//商品全选
router.post("/editCheckAll", function (req, res, next) {
  var userId = req.cookies.userId,
    checkAllFlag = req.body.checkAllFlag ? 1 : 0
  User.findOne({
    'userId': userId
  }, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        resutlt: ''
      })
    } else {
      if (user) {
        user.cartList.forEach(item => {
          item.checked = checkAllFlag
        })
        user.save(function(err,doc){
          if(err){
            res.json({
              status: '1',
              msg: err.message,
              resutlt: ''
            })
          }else{
            res.json({
              status: '0',
              msg: '',
              resutlt: 'suc'
            })
          }
        })
      }



    }
  })
})

module.exports = router;
