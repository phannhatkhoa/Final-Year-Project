const { getAllUsersController, updateUserRoleController, getAllProductsController, deleteUserController, addProductController, deleteProductController, editProductController } = require("../Controllers/admin.controller");
const express = require("express");
const { productCreateMiddleware, productUpdateMiddleware, deleteProductMiddleware } = require("../Middlewares/product.middlewares");
const { deleteUserMiddleware } = require("../Middlewares/auth.middlewares");
const router = express.Router();

//get all users for admin
// Path: /admin/getUser
// Method: GET
// Access: Private
// Request: { token }
// Response: { message: "All users", users: { name, email}
router.get("/getUser", getAllUsersController);

//update user role for admin
// Path: /admin/updateRole/:id
// Method: PUT
// Access: Private
// Request: { updatedData }
// Response: { message: "User updated successfully" }
router.put("/updateRole/:id", updateUserRoleController);

//get all products for admin
// Path: /admin/getProducts
// Method: GET
// Access: Private
// Request: { token }
// Response: { message: "All products", products: { name, price}
router.get("/getProducts", getAllProductsController);


//delete user for admin
// Path: /admin/deleteUser/:id
// Method: DELETE
// Access: Private
// Request: { token }
// Response: { message: "User deleted successfully" }
router.delete("/deleteUser/:id", deleteUserMiddleware, deleteUserController);

//add product for admin
// Path: /admin/addProduct
// Method: POST
// Access: Private
// Request: { name, price, description, category_id, usage_status, image, current_quantity, quantity_sold, brand_id }
// Response: { message: "Product added successfully" }
router.post("/addProduct", productCreateMiddleware, addProductController);

// delete product for admin
// Path: /admin/deleteProduct/:id
// Method: DELETE
// Access: Private
// Request: { token }
// Response: { message: "Product deleted successfully" }
router.delete("/deleteProduct/:id", deleteProductMiddleware, deleteProductController);

// update product for admin
// Path: /admin/updateProduct/:id
// Method: PUT
// Access: Private
// Request: { updatedData }
// Response: { message: "Product updated successfully" }
router.put("/updateProduct/:id", productUpdateMiddleware, editProductController);

module.exports = router;