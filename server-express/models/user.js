var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "userList": Array,
  "orderTotal": String,
  "cartList": [{
    "productId": String,
    "productName": String,
    "salePrice": String,
    "productImage": String,
    "checked": String,
    "productNum": String
    }],
  "addressList": Array
});

//可以加第三个参数'users'表示和mongodb中哪个表关联；
//若未指定，则需要MongoDB的集合添加s即users=》User
module.exports = mongoose.model('User', userSchema);
