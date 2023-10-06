const asyncHandler = require('express-async-handler')
const Products = require("../models/productModel")


const fetchProducts= asyncHandler(async(req, res)=>{
    try{
     const products = await Products.find().sort({price:-1})
     res.status(201).json(products)
    }catch(err){
        console.log(err)
        res.status(400)
        throw new Error("Error occurred while fetching products")
    }
})

const fetchCategories= asyncHandler(async(req, res)=>{
    try{
      const categories = await Products.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
            total_price:{$sum:"$price"}
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
            total_price:1
          },
        },
        {
          $sort:{category:1}
        }
      ]);
      console.log(categories)

      res.status(201).json(categories)

      
    }catch(error){
        res.status(400)
        console.log(error)
        throw new Error("Error occurred while fetching categories")
    }
})

const AddProduct =asyncHandler(async(req,res)=>{
try{
 const data = req.body
 const product = await Products.create(data)
 res.status(201).json(product)
}catch(err){
  console.log(err)
  res.status(400)
  throw new Error('Error occurred while adding a new product')
}
})
module.exports = {
    fetchProducts,
    AddProduct,
}