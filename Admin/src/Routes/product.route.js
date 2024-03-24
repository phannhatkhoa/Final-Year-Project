const express = require("express");
const { createProductController, updateProductController, deleteProductController } = require("../Controllers/product.controller");
const { productUpdateMiddleware, productCreateMiddleware } = require("../Middlewares/product.middlewares");

const router = express.Router();
//Create new product
//path: product/create
//method: POST
//access: Private
//Request: { name, price, description, category, usage_status, image, current_quantity, quantity_sold  }
//Response: { message: "Product created successfully", product: { name, price, description, category, usage_status, image, current_quantity, quantity_sold  } }
router.post("/create",productCreateMiddleware, createProductController);

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