var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productImage":String,
  "productUrl":String
})
//可以加第三个参数'goods'表示和哪个表关联
module.exports = mongoose.model('Good',productSchema);
