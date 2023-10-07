const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    category:{type:String},
    price:{type:Number},
    description:{type:String},
})

const products = mongoose.model('products', productSchema)
module.exports = products