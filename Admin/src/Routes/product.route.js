const express = require("express");
const { createProductController, updateProductController, deleteProductController, getProductController, getProductByIdController } = require("../Controllers/product.controller");
const { productUpdateMiddleware, productCreateMiddleware } = require("../Middlewares/product.middlewares");

const router = express.Router();
//Create new product
//path: product/create
//method: POST
//access: Private
//Request: { name, price, description, category, usage_status, image, current_quantity, quantity_sold  }
//Response: { message: "Product created successfully", product: { name, price, description, category, usage_status, image, current_quantity, quantity_sold  } }
router.post("/create",productCreateMiddleware, createProductController);


// Get all products
//path: product/getAll
//method: GET
//access: Public
//Request: {}
//Response: { products: [{ name, price, description, category, usage_status, image, current_quantity, quantity_sold }] }
router.get("/getAll", getProductController);

//get product by id
//path: product/getProduct
//method: GET
//access: Public
//Request: { id }
//Response: { product: { name, price, description, category, usage_status, image, current_quantity, quantity_sold } }
router.get("/getProduct/:id", getProductByIdController);

// Update product
//path: product/update
//method: PUT
//access: Private
//Request: { name, price, description, category, usage_status, image, current_quantity, quantity_sold }
//Response: { message: "Product updated successfully", product: { name, price, description, category, usage_status, image, current_quantity, quantity_sold } }
router.put("/update/:id", productUpdateMiddleware, updateProductController);

// Delete product
//path: product/delete
//method: DELETE
//access: Private
//Request: { id }
//Response: { message: "Product deleted successfully" }
router.delete("/delete/:id", deleteProductController);

module.exports = router;