const express = require("express");
const { createProductController, updateProductController, deleteProductController, getProductController, getProductByIdController, commentProductController, getCommentController, addCommentController, deleteCommentProductController } = require("../Controllers/product.controller");
const { productUpdateMiddleware, productCreateMiddleware } = require("../Middlewares/product.middlewares");

const router = express.Router();
//Create new product
//path: product/create
//method: POST
//access: Private
//Request: { name, price, description, category, usage_status, image, current_quantity, quantity_sold  }
//Response: { message: "Product created successfully", product: { name, price, description, category, usage_status, image, current_quantity, quantity_sold  } }
router.post("/create", productCreateMiddleware, createProductController);


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

// Comment on product
//path: product/comment
//method: POST
//access: Private
//Request: { id, comment }
//Response: { message: "Comment added successfully", comment }
router.post("/comment", addCommentController);

// get comments
//path: product/getComments
//method: GET
//access: Public
//Request: { id }
//Response: { comments: [{ comment }] }
router.get("/getComments/:id", getCommentController);

// delete comment
//path: product/deleteComment
//method: DELETE
//access: Private
//Request: {comment}
//Response: { message: "Comment deleted successfully" }
router.delete("/deleteComment", deleteCommentProductController);

module.exports = router;