const { getAllUsersController, updateUserRoleController, getAllProductsController, deleteUserController } = require("../Controllers/admin.controller");
const express = require("express");
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
router.delete("/deleteUser/:id", deleteUserController);
module.exports = router;