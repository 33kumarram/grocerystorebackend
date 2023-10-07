const express = require("express")

const {fetchProducts, AddProduct} = require("../controllers/productController")

const router = express.Router()

router.route('/products').get(fetchProducts) 
router.route('/addproduct').post(AddProduct)

module.exports= router

